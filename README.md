![EdgeDL](https://socialify.git.ci/Chumor/EdgeDL/image?custom_language=JavaScript&language=1&name=1&owner=1&pattern=Brick+Wall&theme=Auto)

<p align="center"><strong>“随风潜入夜，润物细无声。”</strong></p>
<hr>

<p align="center">
  <a href="https://github.com/Chumor/EdgeDL" title="GitHub 仓库">
    <img src="https://img.shields.io/badge/GitHub-EdgeDL-181717?logo=github&logoColor=white&style=for-the-badge" alt="GitHub 仓库">
  </a>
  <a href="https://github.com/Chumor/EdgeDL/releases/latest" title="Release">
    <img src="https://img.shields.io/github/v/release/Chumor/EdgeDL?&logo=github&logoColor=white&style=for-the-badge" alt="Release">
  </a>
  <a href="https://www.apache.org/licenses/LICENSE-2.0" title="Apache-2.0 License">
    <img src="https://img.shields.io/badge/License-Apache_2.0-007EC6?logo=apache&logoColor=white&style=for-the-badge" alt="Apache-2.0 License">
  </a>
  <img src="https://img.shields.io/badge/支持平台-Android-3DDC84?logo=android&logoColor=white&style=for-the-badge" alt="支持平台 Android">
</p>

---

## 项目简介

**EdgeDL** 是面向 **Android Edge 浏览器** 的用户脚本，可接管浏览器的下载任务，并使用**外部下载管理器**（如 IDM+/IDM、ADM）进行文件下载。

设计理念：**简洁 · 高效 · 稳定**。

---

## 安装

<p align="center">
  <a href="https://raw.githubusercontent.com/Chumor/EdgeDL/main/dist/EdgeDL.user.js" title="从 GitHub 安装">
    <img src="https://img.shields.io/badge/GitHub-EdgeDL-181717?logo=github&logoColor=white&style=for-the-badge" alt="GitHub">
  </a>

  <a href="https://scriptcat.org/script-show-page/5391" title="从 ScriptCat 安装">
    <img src="https://img.shields.io/badge/ScriptCat-EdgeDL-3DDC84?logo=data:image/png;base64,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&logoColor=white&style=for-the-badge" alt="ScriptCat">
  </a>

  <a href="https://greasyfork.org/scripts/565958-edgedl" title="从 GreasyFork 安装">
    <img src="https://img.shields.io/badge/GreasyFork-EdgeDL-FF9933?logo=greasyfork&logoColor=white&style=for-the-badge" alt="GreasyFork">
  </a>
</p>

---

## 功能支持

以下是 EdgeDL 当前已支持的主要功能：

- [x] 接管 Edge 浏览器下载任务并调用外部下载管理器（部分网站适用）
- [x] 支持 IDM+ / IDM 下载器
- [x] 支持 ADM 下载器

---

## 支持文件类型

- **Android 应用**：`.apk`、`.apks`、`.xapk`、`.apkm`、`.ipa`、`.obb`、……
- **压缩文件**：`.zip`、`.rar`、`.7z`、`.tar`、`.gz`、……
- **视频**：`.mp4`、`.mkv`、`.avi`、`.webm`、……
- **音频**：`.mp3`、`.flac`、`.wav`、……
- **文档 / 电子书**：`.pdf`、`.epub`、`.mobi`、`.doc`、`.xls`、…… 
- **可执行 / 系统文件**：`.exe`、`.msi`、`.dmg`、……
- **种子文件**：`.torrent`

---

## 许可证

**Apache License 2.0** — 免费用于个人及商业项目  
详见 [LICENSE](./LICENSE)
