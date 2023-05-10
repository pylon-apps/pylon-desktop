#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::collections::HashMap;
use std::future::Future;

use serde::Serialize;
use tauri::Manager;
use tokio::sync::mpsc::{self, Receiver, Sender};
use tokio::sync::Mutex;

use libpylon::{Pylon, PylonBuilder, PylonError};

/// Global state of our app.
#[derive(Default)]
struct AppState {
    pylons: Mutex<HashMap<String, Pylon>>,
    channels: Mutex<HashMap<String, Sender<()>>>,
}

/// Payload to track progress of a transfer operation.
#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
struct ProgressPayload {
    /// The current number of bytes transferred.
    pub current: u64,
    /// The total number of bytes to transfer.
    pub total: u64,
    /// The current percentage of the transfer.
    pub percent: u64,
}

/// Indicates if we're currently running in release mode.
#[tauri::command]
fn is_release_mode() -> bool {
    if cfg!(debug_assertions) {
        return false;
    }

    return true;
}

/// Returns the build metadata.
#[tauri::command]
fn get_build_metadata() -> &'static str {
    env!("BUILD_METADATA")
}

/// Generates and returns the Pylon code.
///
/// # Arguments
///
/// * `code_length` - The required length of the Pylon code.
/// * `state` - The global app state.
#[tauri::command]
async fn gen_code(
    code_length: usize,
    state: tauri::State<'_, AppState>,
) -> Result<String, PylonError> {
    // We build a new Pylon and store it in our global state for later use.
    // We uniquely identify this Pylon using its generated code.
    let mut pylon = PylonBuilder::default()
        .id("com.pylon-apps.pylon-desktop".into())
        .build()?;
    let code = pylon.gen_code(code_length).await?;
    let mut pylons = state.pylons.lock().await;

    pylons.insert(code.clone(), pylon);

    Ok(code)
}

/// Returns a handler function that cancels a file transfer operation when it receives a message on a channel.
///
/// # Arguments
///
/// * `rx`- The receiver end of the channel.
async fn get_cancel_handler(mut rx: Receiver<()>) -> impl Future<Output = ()> {
    async move {
        rx.recv().await;
    }
}

/// Returns a handler function that updates the file transfer operation's progress.
///
/// The handler function notifies the frontend of the progress by emitting a payload every time it's invoked.
///
/// # Arguments
///
/// * `code` - The Pylon code for the transfer operation.
/// * `app` - The application handle to emit the event to.
fn get_progress_handler(code: String, app: tauri::AppHandle) -> impl FnMut(u64, u64) + 'static {
    move |current: u64, total: u64| {
        let percent = (current * 100) / total;
        app.emit_all(
            &code,
            ProgressPayload {
                current,
                total,
                percent,
            },
        )
        .unwrap()
    }
}

/// Retrieves a created Pylon and initiates a send operation.
///
/// This function blocks until it can read the global state and create the required handler functions.
/// The file transfer operation runs on a separate thread and does not block the caller's thread.
///
/// # Arguments
///
/// * `code` - The Pylon code for the transfer operation.
/// * `file` - The path of the file to send.
/// * `app` - The application handle.
/// * `state` - The global app state.
#[tauri::command]
async fn send_file(
    code: String,
    file: String,
    app: tauri::AppHandle,
    state: tauri::State<'_, AppState>,
) -> Result<(), PylonError> {
    // We retrieve a Pylon that was already created at the time of code generation, and then use it to initiate the file
    // transfer.
    let mut pylons = state.pylons.lock().await;
    let mut pylon = pylons.remove(&code).ok_or_else(|| {
        PylonError::Error(format!("pylon with code '{}' does not exist", code).into())
    })?;

    // We create a new channel and store its sender-half for later use (when we want to cancel the transfer).
    // We use the receiver-half for the cancel handler function.
    let (tx, rx) = mpsc::channel::<()>(1);
    let mut channels = state.channels.lock().await;
    channels.insert(code.clone(), tx);

    let cancel_handler = get_cancel_handler(rx).await;
    let progress_handler = get_progress_handler(code.clone(), app.clone());

    // Finally, we initiate the file transfer in a separate thread.
    tokio::spawn(async move {
        pylon
            .send_file(file, progress_handler, cancel_handler)
            .await?;

        Ok::<(), PylonError>(())
    });

    Ok(())
}

/// Creates a new Pylon and initiates a receive operation.
///
/// This function blocks until it can read the global state and create the required handler functions.
/// The file transfer operation runs on a separate thread and does not block the caller's thread.
///
/// # Arguments
///
/// * `code` - The Pylon code for the transfer operation.
/// * `file` - The path and name for the received file.
/// * `app` - The application handle.
/// * `state` - The global app state.
#[tauri::command]
async fn receive_file(
    code: String,
    file: String,
    app: tauri::AppHandle,
    state: tauri::State<'_, AppState>,
) -> Result<(), PylonError> {
    let mut pylon = PylonBuilder::default()
        .id("com.pylon-apps.pylon-desktop".into())
        .build()?;

    // We currently don't handle cancellation a file receive request, so we just create a dummy channel.
    // We don't do anything with the sender-half. We use the receiver-half for the dummy cancel handler function.
    let (_tx, rx) = mpsc::channel::<()>(1);

    let cancel_handler = get_cancel_handler(rx).await;

    // Get a receive request. Currently, all receive requests are accepted without prompting.
    pylon.request_file(code.clone(), cancel_handler).await?;

    // Now we create a new channel and store its sender-half for later use (when we want to cancel the transfer).
    // We use the receiver-half for the cancel handler function.
    let (tx, rx) = mpsc::channel::<()>(1);
    let mut channels = state.channels.lock().await;
    channels.insert(code.clone(), tx);

    let cancel_handler = get_cancel_handler(rx).await;
    let progress_handler = get_progress_handler(code, app);

    // Finally, we initiate the file transfer in a separate thread.
    tokio::spawn(async move {
        pylon
            .accept_transfer(file, progress_handler, cancel_handler)
            .await?;
        Ok::<(), PylonError>(())
    });

    Ok(())
}

/// Cancels a transfer operation that is in progress.
///
/// # Arguments
///
/// * `code` - The Pylon code of the transfer operation to cancel.
/// * `state` - The global app state.
#[tauri::command]
async fn cancel_transfer(
    code: String,
    state: tauri::State<'_, AppState>,
) -> Result<(), PylonError> {
    // We retrieve the cancellation channel sender for our transfer operation, and we send a message to it.
    // We also remove and discard the sender from our global app state.
    let mut channels = state.channels.lock().await;

    let tx = channels.remove(&code).ok_or_else(|| {
        PylonError::Error(format!("channel with code '{}' does not exist", code).into())
    })?;
    tx.send(()).await.map_err(|e| PylonError::Error(e.into()))?;

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .manage(AppState {
            pylons: Mutex::new(HashMap::new()),
            channels: Mutex::new(HashMap::new()),
        })
        .invoke_handler(tauri::generate_handler![
            is_release_mode,
            get_build_metadata,
            gen_code,
            send_file,
            receive_file,
            cancel_transfer,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
