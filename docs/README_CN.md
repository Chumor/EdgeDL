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
  <a href="README.md">English</a> | <strong>简体中文</strong>
</p>

> 让 Android 版 Microsoft Edge 将下载请求交给你偏好的外部下载器。

**EdgeDL** 是一款面向 Android 版 Microsoft Edge 的用户脚本，用于识别网页中的下载行为，并根据配置将下载请求转交给受支持的外部下载管理器，或交由 Microsoft Edge 默认处理。

## 核心能力

- **下载接管：** 根据配置将下载请求交给受支持的外部下载管理器处理，或由 Microsoft Edge 默认处理。
- **下载管理器：** 支持 1DM、1DM+、ADM、ABDM 和 FDM。
- **处理策略：**
  - **默认下载管理器：** 为下载请求指定默认处理方式。
  - **下载时询问：** 下载前选择处理方式。
  - **Edge 处理：** 明确跳过接管，让 Microsoft Edge 继续原生下载流程。
- **站点规则：** 支持按网站启用或跳过下载接管。
- **下载识别：** 识别常见下载链接及页面脚本触发的下载请求。
- **脚本菜单：** 可通过用户脚本管理器菜单切换默认下载器和站点接管状态。
- **本地配置：** 默认下载器、站点规则等配置保存在用户脚本管理器本地存储中。

## 支持的下载器

| 下载器 | 包名 / 含义 |
| --- | --- |
| 1DM | `idm.internet.download.manager` |
| 1DM+ | `idm.internet.download.manager.plus` |
| ADM | `com.dv.adm` |
| ABDM | `com.abdownloadmanager` |
| FDM | `org.freedownloadmanager.fdm` |
| Edge | 跳过接管，让 Microsoft Edge 自行处理下载 |

> EdgeDL 仅负责转交下载请求，最终是否能够成功下载取决于目标下载管理器及网站环境的支持情况。

## 安装

<p align="center">
  <a href="https://github.com/Chumor/EdgeDL/releases/latest" title="从 GitHub 安装">
    <img src="https://img.shields.io/badge/GitHub-181717?labelColor=181717&color=181717&logo=github&logoColor=white&style=for-the-badge" alt="GitHub">
  </a>
  <a href="https://scriptcat.org/script-show-page/5391" title="从 ScriptCat 安装">
    <img src="https://cdn.jsdelivr.net/gh/Chumor/EdgeDL@refs/heads/main/docs/badges/ScriptCat-badge.svg" alt="ScriptCat" height="28">
  </a>
  <a href="https://greasyfork.org/scripts/565958-edgedl" title="从 GreasyFork 安装">
    <img src="https://img.shields.io/badge/GreasyFork-670000?logo=greasyfork&logoColor=white&style=for-the-badge" alt="GreasyFork">
  </a>
  <a href="https://github.com/Chumor/EdgeDL/actions/workflows/build.yml" title="从 GitHub Actions CI 构建安装">
    <img src="https://img.shields.io/badge/CI%20Build-2088FF?labelColor=2088FF&color=2088FF&logo=githubactions&logoColor=white&style=for-the-badge" alt="CI Build">
  </a>
</p>

GitHub、ScriptCat 与 GreasyFork 提供稳定版本；CI Build 提供最新自动构建版本，适合提前体验更新。

## 用户脚本权限说明

| 权限 | 用途 |
| --- | --- |
| `GM_getValue` / `GM_setValue` / `GM_deleteValue` | 保存默认下载器、站点规则等本地配置。 |
| `GM_registerMenuCommand` | 提供用户脚本管理器菜单操作。 |
| `GM_info` | 读取脚本版本等元数据。 |
| `unsafeWindow` | 观察网页脚本触发的页面级跳转行为。 |
| `@match *://*/*` | 在网页中检测下载链接和脚本触发的下载行为。 |

EdgeDL 运行在网页中，是因为下载按钮和下载链接可能出现在任意网站。脚本仅在本地处理这些请求，不会上传浏览记录或下载记录。

## 兼容性说明

EdgeDL 的下载接管能力可能受到网站行为、Android 系统限制、用户脚本管理器兼容性及下载管理器支持情况的影响，包括：

- blob URL、临时签名 URL、多段重定向等特殊下载机制；
- 依赖页面脚本、用户会话、鉴权 Cookie、请求 Header 或一次性 Token 的下载流程；
- Android 系统限制浏览器唤起外部应用；
- 下载管理器对特定协议或请求参数的支持情况；
- 用户脚本管理器对菜单、存储 API 和页面上下文访问的支持情况；
- Android 版 Microsoft Edge 不同版本的兼容性差异。

部分网站可能需要针对其下载流程进行额外适配。

## 与 EdgeDL-Ext 的关系

**EdgeDL** 是原始用户脚本项目。

**EdgeDL-Ext** 基于相同理念重新实现，并针对 Android 版 Microsoft Edge 的 Manifest V3 扩展环境进行了适配。

## 致谢

- Vectors and icons by [SVG Repo](https://www.svgrepo.com)

## 许可证

EdgeDL 基于 [Apache License 2.0](./LICENSE) 开源。