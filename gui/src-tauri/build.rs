use chrono::Utc;

fn main() {
    println!("cargo:rustc-env=BUILD_TIMESTAMP={}", Utc::now());

    tauri_build::build()
}
