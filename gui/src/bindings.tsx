import { invoke } from "@tauri-apps/api";

/**
 * Type alias for an object containing binding functions.
 *
 * @typedef {Bindings}
 */
type Bindings = { readonly [key: string]: (..._: any[]) => Promise<any> };

/**
 * Bindings to Rust functions (that are provided as Tauri commands).
 *
 * @type {Bindings}
 */
export const bindings: Bindings = {
  is_release_mode,
  core_version,
};

/**
 * Indicates if we're currently running in release mode.
 *
 * @returns {Promise<boolean>} Resolves to whether we're running in release mode.
 */
function is_release_mode(): Promise<boolean> {
  return invoke("is_release_mode");
}

/**
 * Returns the current version of the Pylon core library.
 *
 * @returns {Promise<string>} Resolves to the Pylon core version string.
 */
function core_version(): Promise<string> {
  return invoke("core_version");
}
