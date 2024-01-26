// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn is_release_mode() -> bool {
    cfg!(debug_assertions)
}

#[tauri::command]
fn get_build_metadata() -> &'static str {
    env!("BUILD_METADATA")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            is_release_mode,
            get_build_metadata
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
