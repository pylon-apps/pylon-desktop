import { invoke } from "@tauri-apps/api";

/**
 * Metadata generated at build-time by the Tauri backend.
 *
 * @export
 * @interface BuildMetadata
 * @typedef {BuildMetadata}
 */
export interface BuildMetadata {
  readonly coreVersion: string;
  readonly buildTimestamp: string;
  readonly commitId: string;
}

/**
 * Indicates if we're currently running in release mode.
 *
 * @export
 * @async
 * @returns {Promise<boolean>} Resolves to whether we're running in release mode.
 */
export async function isReleaseMode(): Promise<boolean> {
  return await invoke("is_release_mode");
}

/**
 * Retrieves and returns the build metadata from the Tauri backend.
 *
 * @export
 * @async
 * @returns {Promise<BuildMetadata>} Resolves to the build metadata.
 */
export async function getBuildMetadata(): Promise<BuildMetadata> {
  let metadata = await invoke<string>("get_build_metadata");
  return JSON.parse(metadata);
}