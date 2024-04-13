import { invoke } from "@tauri-apps/api";


/**
 * Indicates if we're currently running in "release" mode.
 *
 * @export
 * @async
 * @returns {Promise<boolean>}
 */
export async function isReleaseMode(): Promise<boolean> {
	return await invoke("is_release_mode");
}
