import { invoke } from "@tauri-apps/api";

/**
 * Indicates if we're currently running in release mode.
 *
 * @returns {Promise<boolean>} Resolves to whether we're running in release mode.
 */
export function is_release_mode(): Promise<boolean> {
  return invoke("is_release_mode");
}

/**
 * Returns the current version of the Pylon core library.
 *
 * @returns {Promise<string>} Resolves to the Pylon core version string.
 */
export function core_version(): Promise<string> {
  return invoke("core_version");
}

/**
 * Returns the build timestamp.
 *
 * @returns {Promise<string>} Resolves to the build timestamp string.
 */
export function build_timestamp(): Promise<string> {
  return invoke("build_timestamp");
}
