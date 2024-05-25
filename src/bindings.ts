import { invoke } from "@tauri-apps/api";


/**
 * Indicates if we're currently running in "release" mode.
 *
 * @export
 * @async
 * @returns {Promise<boolean>} Resolves to `true` if we're in "release" mode, `false` otherwise.
 */
export async function isReleaseMode(): Promise<boolean> {
	return await invoke("is_release_mode");
}


/**
 * Generates a Pylon code.
 *
 * @export
 * @async
 * @param {number} codeLength The length of the code to generate.
 * @returns {Promise<string>} Resolves to the generated Pylon code.
 */
export async function genCode(codeLength: number): Promise<string> {
	return await invoke("gen_code", { codeLength });
}
