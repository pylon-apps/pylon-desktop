import { invoke } from "@tauri-apps/api";

/**
 * Type alias for an object containing binding functions.
 * @date 2/26/2023 - 4:55:46 PM
 *
 * @typedef {Bindings}
 */
type Bindings = { [key: string]: (..._: any[]) => Promise<any> };

/**
 * Bindings to Rust functions (that are provided as Tauri commands).
 * @date 2/26/2023 - 4:55:23 PM
 *
 * @type {Bindings}
 */
export const bindings: Bindings = {
  is_release_mode,
  core_version,
};

/**
 * Indicates if we're currently running in release mode.
 * @date 2/26/2023 - 4:08:07 PM
 *
 * @returns {Promise<boolean>} Resolves to whether we're running in release mode.
 */
function is_release_mode(): Promise<boolean> {
  return invoke("is_release_mode");
}

/**
 * Returns the current version of the Pylon core library.
 * @date 2/26/2023 - 4:10:17 PM
 *
 * @returns {Promise<string>} Resolves to the Pylon core version string.
 */
function core_version(): Promise<string> {
  return invoke("core_version");
}
