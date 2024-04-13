// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

/// Indicates if we're currently running in "release" mode.
#[tauri::command]
fn is_release_mode() -> bool {
    !cfg!(debug_assertions)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![is_release_mode])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
