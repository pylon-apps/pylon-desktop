#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

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

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            is_release_mode,
            get_build_metadata,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}