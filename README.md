# pylon-desktop

<p align="center">
  <img width="256" height="256" src="src/assets/logo.png" alt="Pylon Logo">
</p>

Cross-platform, secure file transfer desktop application.

## About

Pylon Desktop is a cross-platform desktop application that allows for easy and secure file transfers.

It is built using the [Tauri](https://tauri.app/) framework, and currently supports Windows, macOS and GNU/Linux.

## Local Development

**NOTE**: This application is currently a work-in-progress, and as such, these instructions will likely be incomplete.

1. Install the Tauri pre-requisites for your platform by following the
   instructions [here](https://tauri.app/v1/guides/getting-started/prerequisites).
2. Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install).
3. Clone this repository to your system.
4. Install the Node dependencies: `yarn install .`.
5. Run the project in development mode: `yarn tauri dev`.
6. Build the project for your platform: `yarn tauri build`.
