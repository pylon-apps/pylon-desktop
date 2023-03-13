import { invoke } from "@tauri-apps/api";
import { once, Event } from "@tauri-apps/api/event";

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
 * Tracks the progress of the file-transfer operation.
 * This payload is emitted as an event from the Tauri backend.
 *
 * @export
 * @interface ProgressPayload
 * @typedef {ProgressPayload}
 */
export interface ProgressPayload {
  current: number;
  total: number;
  percent: number;
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

/**
 * Generates a Pylon code.
 *
 * @export
 * @async
 * @param {number} codeLength The required length of the Pylon code.
 * @returns {Promise<string>} Resolves to the generated Pylon code.
 */
export async function genCode(codeLength: number): Promise<string> {
  return await invoke("gen_code", { codeLength });
}

/**
 * Initiates a file-sending operation that blocks until the transfer begins.
 *
 * @export
 * @async
 * @param {string} code The Pylon code.
 * @param {string} file The path of the file to send.
 * @returns {Promise<void>} Resolves when the file transfer operation begins.
 */
export async function sendFile(code: string, file: string): Promise<void> {
  // Initiate the file transfer.
  // NOTE: This is non-blocking as Tauri invokes the command in a separate thread.
  await invoke("send_file", { code, file });

  // We now block and listen for the backend to emit its first event. This event is emitted when the connection with the
  // receiver is established and the file transfer begins.
  return new Promise((resolve) => {
    const unlisten = once(code, (_: Event<ProgressPayload>) => {
      // Once we receive the first event, we stop listening to future events and resolve to unblock the caller.
      unlisten.then((unlisten) => unlisten());
      resolve();
    });
  });
}

/**
 * Initiates a file-receive operation that blocks until the transfer begins.
 *
 * @export
 * @async
 * @param {string} code The Pylon code.
 * @param {string} file The path and name for the received file.
 * @returns {Promise<void>} Resolves when the file transfer operation begins.
 */
export async function receiveFile(code: string, file: string): Promise<void> {
  // Initiate the file transfer.
  // NOTE: This is non-blocking as Tauri invokes the command in a separate thread.
  await invoke("receive_file", { code, file });

  // We now block and listen for the backend to emit its first event. This event is emitted when the connection with the
  // sender is established and the file transfer begins.
  return new Promise((resolve) => {
    const unlisten = once(code, (_: Event<ProgressPayload>) => {
      // Once we receive the first event, we stop listening to future events and resolve to unblock the caller.
      unlisten.then((unlisten) => unlisten());
      resolve();
    });
  });
}

/**
 * Cancels an active transfer operation.
 *
 * @export
 * @async
 * @param {string} code The Pylon code.
 * @returns {Promise<void>} Resolves when the transfer operation cancels.
 */
export async function cancelTransfer(code: string): Promise<void> {
  return await invoke("cancel_transfer", { code });
}
