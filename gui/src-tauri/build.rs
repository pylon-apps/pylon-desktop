use std::fmt;
use std::process::Command;

use chrono::Utc;
use serde::Serialize;

use pylon_core::consts::APP_VERSION;

/// Metadata generated at build-time.
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct BuildMetadata {
    /// The version of the Pylon core library.
    core_version: &'static str,
    /// The timestamp of when the build occured (in UTC).
    build_timestamp: String,
    /// The latest git commit's ID.
    commit_id: String,
}

impl fmt::Display for BuildMetadata {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", serde_json::to_string(self).unwrap())
    }
}

impl BuildMetadata {
    /// Generates and returns the build metadata.
    fn new() -> Self {
        let core_version = APP_VERSION;
        let build_timestamp = Utc::now().to_string();
        let commit_id = match Command::new("git").args(&["rev-parse", "HEAD"]).output() {
            Ok(out) => String::from_utf8(out.stdout).unwrap_or("Unknown".into()),
            Err(_) => String::from("Unknown"),
        };

        Self {
            core_version,
            build_timestamp,
            commit_id,
        }
    }
}

fn main() {
    println!(
        "cargo:rustc-env=BUILD_METADATA={}",
        BuildMetadata::new().to_string()
    );

    tauri_build::build()
}
