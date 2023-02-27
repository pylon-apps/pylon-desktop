use std::process::Command;

use chrono::Utc;

fn main() {
    let commit_id = match Command::new("git").args(&["rev-parse", "HEAD"]).output() {
        Ok(out) => String::from_utf8(out.stdout).unwrap_or("Unknown".into()),
        Err(_) => String::from("Unknown"),
    };

    println!("cargo:rustc-env=GIT_COMMIT_ID={commit_id}");
    println!("cargo:rustc-env=BUILD_TIMESTAMP={}", Utc::now());

    tauri_build::build()
}
