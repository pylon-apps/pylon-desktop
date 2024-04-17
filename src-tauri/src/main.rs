// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use libpylon::{PylonBuilder, PylonError};

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
async fn gen_code(code_length: usize) -> Result<String, PylonError> {
    let mut pylon = PylonBuilder::default()
        .id("com.pylon-apps.pylon-desktop".into())
        .build()?;
    let code = pylon.gen_code(code_length).await?;

    Ok(code)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![is_release_mode, gen_code])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
