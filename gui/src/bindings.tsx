import { invoke } from "@tauri-apps/api";

export const bindings = {
  is_release_mode,
  core_version,
};

/**
 * Indicates if we're currently running in release mode.
 * @date 2/26/2023 - 4:08:07 PM
 *
 * @returns {Promise<boolean>} Promise that resolves to whether we're running in release mode.
 */
function is_release_mode(): Promise<boolean> {
  return invoke("is_release_mode");
}

/**
 * Returns the current version of the Pylon core library.
 * @date 2/26/2023 - 4:10:17 PM
 *
 * @returns {Promise<string>} Promise that resolves to the Pylon core version string.
 */
function core_version(): Promise<string> {
  return invoke("core_version");
}
