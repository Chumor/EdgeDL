![EdgeDL](https://socialify.git.ci/Chumor/EdgeDL/image?custom_language=JavaScript&language=1&name=1&owner=1&pattern=Brick+Wall&theme=Auto)

<p align="center"><strong>“随风潜入夜，润物细无声。”</strong></p>
<hr>

<p align="center">
  <a href="https://www.apache.org/licenses/LICENSE-2.0"><img src="https://img.shields.io/badge/License-Apache_2.0-D22128.svg" alt="License: Apache 2.0"></a>
  <a href="https://github.com/Chumor/EdgeDL/releases/latest"><img src="https://img.shields.io/github/v/release/Chumor/EdgeDL?label=Stable" alt="Latest Release"></a>
  <a href="https://github.com/Chumor/EdgeDL/releases"><img src="https://img.shields.io/github/v/release/Chumor/EdgeDL?include_prereleases&label=Pre-release" alt="Prerelease"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript"></a>
</p>

<p align="center">
  <strong>English</strong> | <a href="README_CN.md">简体中文</a>
</p>

> Let Microsoft Edge on Android send download requests to your preferred external downloader.

**EdgeDL** is a userscript for Microsoft Edge on Android. It detects download behavior on webpages and, based on your configuration, sends download requests to supported external download managers or leaves them to Microsoft Edge.

## Core Features

- **Download takeover:** Send download requests to supported external download managers based on your configuration, or let Microsoft Edge handle them normally.
- **Downloader support:** Supports 1DM, 1DM+, ADM, ABDM, and FDM.
- **Handling strategies:**
  - **Default downloader:** Specify the default target for download requests.
  - **Ask on download:** Choose how to handle each download before forwarding it.
  - **Edge handling:** Explicitly skip takeover and let Microsoft Edge continue its normal download flow.
- **Site rules:** Enable or skip download takeover per website.
- **Download detection:** Detect common download links and download requests triggered by page scripts.
- **Userscript menu:** Change the default downloader and toggle site-level takeover from the userscript manager menu.
- **Local configuration:** Default downloader, site rules, and other settings are stored locally by the userscript manager.

## Supported Downloaders

| Downloader | Package / meaning |
| --- | --- |
| 1DM | `idm.internet.download.manager` |
| 1DM+ | `idm.internet.download.manager.plus` |
| ADM | `com.dv.adm` |
| ABDM | `com.abdownloadmanager` |
| FDM | `org.freedownloadmanager.fdm` |
| Edge | Skip takeover and let Microsoft Edge handle the download |

> EdgeDL only forwards download requests. Whether the final download succeeds depends on the target download manager and the website environment.

## Installation

<p align="center">
  <a href="https://github.com/Chumor/EdgeDL/releases/latest" title="Install from GitHub">
    <img src="https://img.shields.io/badge/GitHub-181717?labelColor=181717&color=181717&logo=github&logoColor=white&style=for-the-badge" alt="GitHub">
  </a>
  <a href="https://scriptcat.org/script-show-page/5391" title="Install from ScriptCat">
    <img src="https://cdn.jsdelivr.net/gh/Chumor/EdgeDL@refs/heads/main/docs/badges/ScriptCat-badge.svg" alt="ScriptCat" height="28">
  </a>
  <a href="https://greasyfork.org/scripts/565958-edgedl" title="Install from GreasyFork">
    <img src="https://img.shields.io/badge/GreasyFork-670000?logo=greasyfork&logoColor=white&style=for-the-badge" alt="GreasyFork">
  </a>
  <a href="https://github.com/Chumor/EdgeDL/actions/workflows/build.yml" title="Install from GitHub Actions CI build">
    <img src="https://img.shields.io/badge/CI%20Build-2088FF?labelColor=2088FF&color=2088FF&logo=githubactions&logoColor=white&style=for-the-badge" alt="CI Build">
  </a>
</p>

GitHub, ScriptCat, and GreasyFork provide stable versions. CI Build provides the latest automated build and is suitable for trying updates early.

## Userscript Permissions

| Permission | Purpose |
| --- | --- |
| `GM_getValue` / `GM_setValue` / `GM_deleteValue` | Save default downloader, site rules, and other local configuration. |
| `GM_registerMenuCommand` | Provide userscript manager menu actions. |
| `GM_info` | Read userscript metadata such as the current version. |
| `unsafeWindow` | Observe page-level navigation behavior triggered by webpage scripts. |
| `@match *://*/*` | Detect download links and script-triggered download behavior on webpages. |

EdgeDL runs on webpages because download buttons and download links may appear on any website. The script only processes these requests locally and does not upload browsing history or download history.

## Compatibility Notes

EdgeDL's download takeover capability may be affected by website behavior, Android system restrictions, userscript manager compatibility, and download manager support, including:

- blob URLs, temporary signed URLs, multi-step redirects, and other special download mechanisms;
- download flows that depend on page scripts, user sessions, authentication cookies, request headers, or one-time tokens;
- Android system restrictions on browsers launching external apps;
- download manager support for specific protocols or request parameters;
- userscript manager support for menu commands, storage APIs, and page-context access;
- compatibility differences across Microsoft Edge for Android versions.

Some websites may require additional adaptation for their download flow.

## Relationship to EdgeDL-Ext

**EdgeDL** is the original userscript project.

**EdgeDL-Ext** is based on the same idea and is reimplemented for the Manifest V3 extension environment of Microsoft Edge on Android.

## Acknowledgements

- Vectors and icons by [SVG Repo](https://www.svgrepo.com)

## License

EdgeDL is released under the [Apache License 2.0](./LICENSE).