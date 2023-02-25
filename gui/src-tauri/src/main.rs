#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use pylon_core::consts::APP_VERSION;

/// Returns the current version of the Pylon core library.
#[tauri::command]
fn core_version() -> &'static str {
    APP_VERSION
}

/// Indicates if we're currently running in release mode.
#[tauri::command]
fn is_release_mode() -> bool {
    if cfg!(debug_assertions) {
        return false;
    }

    return true;
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .invoke_handler(tauri::generate_handler![is_release_mode, core_version])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
