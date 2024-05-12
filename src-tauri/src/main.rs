// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use libpylon::{Pylon, PylonBuilder, PylonError};
use tokio::sync::Mutex;

#[derive(Default)]
struct State {
    code: Mutex<Option<String>>,
    pylon: Mutex<Option<Pylon>>,
}

/// Indicates if we're currently running in "release" mode.
#[tauri::command]
fn is_release_mode() -> bool {
    !cfg!(debug_assertions)
}

/// Generates a Pylon code.
///
/// # Arguments
///
/// * `code_length` - The length of the code to generate.
#[tauri::command]
async fn gen_code(
    code_length: usize,
    app: tauri::AppHandle,
    state: tauri::State<'_, State>,
) -> Result<String, PylonError> {
    let config = app.config();
    let mut pylon = PylonBuilder::default()
        .id(config.tauri.bundle.identifier.clone())
        .build()?;
    let code = pylon.gen_code(code_length).await?;

    let mut state_code = state.code.lock().await;
    let mut state_pylon = state.pylon.lock().await;

    state_code.replace(code.clone());
    state_pylon.replace(pylon);

    Ok(code)
}

fn main() {
    tauri::Builder::default()
        .manage(State {
            code: Mutex::default(),
            pylon: Mutex::default(),
        })
        .invoke_handler(tauri::generate_handler![is_release_mode, gen_code])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
