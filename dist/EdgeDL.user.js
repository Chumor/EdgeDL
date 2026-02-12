// ==UserScript==
// @name         EdgeDL
// @namespace    https://github.com/Chumor/EdgeDL
// @version      1.1.0
// @description  EdgeDL：让 Android Edge 浏览器使用外部下载器下载文件
// @icon         data:image/png;base64,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
// @author       Chumor
// @match        *://*/*
// @grant        none
// @license      Apache-2.0
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/Chumor/EdgeDL/main/dist/EdgeDL.user.js
// @updateURL    https://raw.githubusercontent.com/Chumor/EdgeDL/main/dist/EdgeDL.user.js
// ==/UserScript==


(function () {
    'use strict';

    // 下载器用户配置
    const DOWNLOADERS = {
        IDM: 'idm.internet.download.manager.plus',
        ADM: 'com.dv.adm'
    };

     // 默认下载器，可选 .IDM / .ADM
    let selectedDownloader = DOWNLOADERS.IDM;

    // 下载链接关键字匹配
    const EXTENSIONS = [
        '.apk','.apks','.xapk','.apkm','.ipa','.obb','.aab',
        '.zip','.rar','.7z','.tar','.gz','.tgz','.bz2','.xz',
        '.iso','.cab','.jar','.z',
        '.mp4','.mkv','.avi','.mov','.flv','.wmv','.webm',
        '.m4v','.3gp','.ts','.mpg','.mpeg','.vob',
        '.mp3','.flac','.wav','.ogg','.m4a','.aac','.wma','.ape',
        '.pdf','.epub','.mobi','.azw3','.djvu',
        '.doc','.docx','.xls','.xlsx','.ppt','.pptx',
        '.exe','.msi','.bin','.dat','.dmg','.bat','.sh','.img',
        '.torrent'
    ];

    // 下载链接后缀匹配
    const KEYWORDS = [
        '/down/','/download/','/downloads/','/dl/','/get/','/fetch/',
        '/files/','/file/','/attach/','/attachment/','/media/','/static/',
        '/assets/','/cdn/','/dist/','/repo/','/backup/','/upload/',
        '/releases/download/','/binary/','/pkg/',
        '?file=','&file=','?filename=','&filename=','?f=','&f=',
        'download?','&download=','?download=','&download=',
        'token=','auth_key=','download_token=','sig=','signature=',
        'force_download','response-content-disposition=',
        'content-disposition=attachment'
    ];

    // 下载链接检测
    function isDownloadLink(url){
        if(!url || !url.startsWith('http')) return false;
        const lowerUrl = url.toLowerCase();

        // 排除非下载页面
        if(
            lowerUrl.includes('/login')||lowerUrl.includes('/register')||
            lowerUrl.includes('/signin')||lowerUrl.includes('/signup')||
            lowerUrl.includes('/logout')||
            lowerUrl.includes('/account/')||lowerUrl.includes('/user/')||
            lowerUrl.includes('/blob/')||lowerUrl.includes('/src/')||
            lowerUrl.includes('/tree/')
        ) return false;

        // 后缀匹配
        try{
            const path = new URL(url).pathname.toLowerCase();
            if(EXTENSIONS.some(ext=>path.endsWith(ext))) return true;
        }catch(e){
            const path = lowerUrl.split('?')[0].split('#')[0];
            if(EXTENSIONS.some(ext=>path.endsWith(ext))) return true;
        }

        // 关键字匹配
        return KEYWORDS.some(kw=>lowerUrl.includes(kw));
    }

    function openIDM(url, packageName) {
        const scheme = url.startsWith('https') ? 'https' : 'http';
        const cleanLink = url.replace(/^https?:\/\//, '');
        const intentUrl = `intent://${cleanLink}#Intent;scheme=${scheme};package=${packageName};type=*/*;end`;
        window.location.href = intentUrl;
    }

    function openADM(url) {
        const scheme = url.startsWith('https') ? 'https' : 'http';
        const cleanLink = url.replace(/^https?:\/\//, '');
        const intentUrl = `intent://${cleanLink}#Intent;scheme=${scheme};package=${DOWNLOADERS.ADM};type=*/*;end`;
        window.location.href = intentUrl;
    }

    function showToast(message, duration = 1500) {
        try {
            const downloaderName = selectedDownloader === DOWNLOADERS.IDM ? 'IDM+' : 'ADM';
            const toastMessage = message || `⚡ ${downloaderName} 正在唤起...`;

            const toast = document.createElement('div');
            toast.textContent = toastMessage;
            toast.style.cssText = `
            position: fixed;
            bottom: 15%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.85);
            color: #fff;
            font-weight: 500;
            font-size: 13px;
            padding: 10px 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 999999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        `;

            document.body.appendChild(toast);

            requestAnimationFrame(() => {
                toast.style.opacity = '1';
            });

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.addEventListener('transitionend', () => toast.remove(), { once: true });
            }, duration);
        } catch (err) {
            console.warn('Toast 创建失败', err);
        }
    }

    function showDownloadPicker(url) {
        if(document.getElementById('edgedl-picker')) return;

        const idmIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAxOTIgMTkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE5MiAxOTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik00NS45IDg4LjJjMCAxLjItLjcgMi4xLTEuOSAyLjMtMTMuMiAyLjktMjIuNSAxNC44LTIyIDI4IC4zIDcuNCAzLjggMTQuNCA5LjMgMTkuNCA1LjggNS4yIDEyLjggNyAyMC40IDYuOSAxMC0uMSAyMC4yIDAgMzAuNCAwaDU4LjNjOC43IDAgMTYuMS0yLjMgMjIuMS04LjggNS40LTUuOCA4LjQtMTQgNy4zLTIxLjktMS40LTEwLjUtOS41LTE5LjYtMjAuNC0yMi42LTEuMi0uMy0xLjktMS41LTEuNy0yLjUuNi00LjUgMS4yLTE0LjItNC41LTIzLjktOC4zLTE0LTIyLjctMTYuOS0yNS0xNy4zLTEyLjktMi4zLTIyLjYgMy0yNSA0LjMtOS40IDUuNS0xMy44IDEzLjUtMTUuNyAxOC0uNSAxLjQtMi4xIDEuOS0zLjQgMS4yLTUuNC0zLjMtMTIuMS0zLjctMTcuNy0xLjItNi42IDMtMTAuOCAxMC4zLTEwLjUgMTguMXptNTUuOC03Ljd2MjkuM0wxMTQgOTcuNWwtMTIuMyAxMi4zLTEyLjMtMTIuM20tNS4yIDI3LjdoMzUiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMCIvPjwvc3ZnPg==';
        const idmPlusIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAxOTIgMTkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE5MiAxOTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik00NC43IDEwMC4zYzAgMS4xLS43IDItMS44IDIuMi0xMi41IDIuNy0yMS40IDE0LjEtMjAuOSAyNi42LjMgNyAzLjYgMTMuNyA4LjggMTguNCA1LjUgNC45IDEyLjEgNi42IDE5LjQgNi41IDkuNS0uMSAxOS4yIDAgMjguOCAwaDU1LjNjOC4yIDAgMTUuMy0yLjIgMjEtOC4zIDUuMS01LjUgNy45LTEzLjMgNi45LTIwLjgtMS4zLTkuOS05LTE4LjYtMTkuNC0yMS41LTEuMS0uMy0xLjgtMS40LTEuNi0yLjQuNi00LjMgMS4xLTEzLjUtNC4zLTIyLjctNy44LTEzLjMtMjEuNi0xNi4xLTIzLjctMTYuNS0xMi4yLTIuMS0yMS40IDIuOS0yMy42IDQuMi04LjkgNS4yLTEzLjEgMTIuOC0xNC45IDE3LjEtLjUgMS4zLTIgMS44LTMuMiAxLjEtNS4xLTMuMS0xMS40LTMuNS0xNi44LTEuMS02LjMgMy0xMC4zIDkuOS0xMCAxNy4yek0xNTQuOSAzOHYzMC4xbS0xNS0xNUgxNzBNOTcuNiA5M3YyNy45bDExLjgtMTEuNy0xMS44IDExLjdMODYgMTA5LjJtLTQuNCAyNi4zaDMyIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxMjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTAiLz48L3N2Zz4=';
        const admIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9PC9zdHlsZT48L2RlZnM+PHBvbHlsaW5lIGNsYXNzPSJhIiBwb2ludHM9IjI5LjM0IDMzLjA0IDM0LjU5IDM5Ljc1IDQzLjUgMjguMzcgMzguMjYgMjguMzcgMzguMjYgMTcuMjEgMzAuOTIgMTcuMjEgMzAuOTIgMjMuODQiLz48cG9seWxpbmUgY2xhc3M9ImEiIHBvaW50cz0iMTguOTUgMjEuNTUgMTcuMDggMjEuNTUgMTcuMDggMTAuMzkgOS43NCAxMC4zOSA5Ljc0IDIxLjU1IDQuNSAyMS41NSAxMy40MSAzMi45MyAxNi4wOCAyOS41MiIvPjxwb2x5Z29uIGNsYXNzPSJhIiBwb2ludHM9IjI5LjIyIDIzLjg0IDI5LjIyIDguMjUgMTguOTUgOC4yNSAxOC45NSAyMy44NCAxMS42MyAyMy44NCAyNC4wOSAzOS43NSAzNi41NCAyMy44NCAyOS4yMiAyMy44NCIvPjwvc3ZnPg==';
        const edgeIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI3NjAwIDI3NjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48bGluZWFyR3JhZGllbnQgaWQ9IkEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIi8+PGxpbmVhckdyYWRpZW50IGlkPSJCIiB4MT0iNjg3MCIgeDI9IjI0NzA0IiB5MT0iMTg3MDUiIHkyPSIxODcwNSIgeGxpbms6aHJlZj0iI0EiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzBjNTlhNCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzExNGE4YiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJDIiB4MT0iMTYyNzIiIHgyPSI1MTMzIiB5MT0iMTA5NjgiIHkyPSIyMzEwMiIgeGxpbms6aHJlZj0iI0EiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzFiOWRlMiIvPjxzdG9wIG9mZnNldD0iLjE2IiBzdG9wLWNvbG9yPSIjMTU5NWRmIi8+PHN0b3Agb2Zmc2V0PSIuNjciIHN0b3AtY29sb3I9IiMwNjgwZDciLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDc4ZDQiLz48L2xpbmVhckdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iRCIgY3g9IjE2NzIwIiBjeT0iMTg3NDciIHI9Ijk1MzgiIHhsaW5rOmhyZWY9IiNBIj48c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1vcGFjaXR5PSIwIi8+PHN0b3Agb2Zmc2V0PSIuOTUiIHN0b3Atb3BhY2l0eT0iLjUzIi8+PHN0b3Agb2Zmc2V0PSIxIi8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9IkUiIGN4PSI3MTMwIiBjeT0iMTk4NjYiIHI9IjE0MzI0IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC4xNDg0MyAtLjk4ODkyIC43OTY4OCAuMTE5NiAtODc1OSAyNTU0MikiIHhsaW5rOmhyZWY9IiNBIj48c3RvcCBvZmZzZXQ9Ii43NiIgc3RvcC1vcGFjaXR5PSIwIi8+PHN0b3Agb2Zmc2V0PSIuOTUiIHN0b3Atb3BhY2l0eT0iLjUiLz48c3RvcCBvZmZzZXQ9IjEiLz48L3JhZGlhbEdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iRiIgY3g9IjI1MjMiIGN5PSI0NjgwIiByPSIyMDI0MyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtLjAzNzE1IC45OTkzMSAtMi4xMjgzNiAtLjA3OTEzIDEzNTc5IDM1MzApIiB4bGluazpocmVmPSIjQSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMzVjMWYxIi8+PHN0b3Agb2Zmc2V0PSIuMTEiIHN0b3AtY29sb3I9IiMzNGMxZWQiLz48c3RvcCBvZmZzZXQ9Ii4yMyIgc3RvcC1jb2xvcj0iIzJmYzJkZiIvPjxzdG9wIG9mZnNldD0iLjMxIiBzdG9wLWNvbG9yPSIjMmJjM2QyIi8+PHN0b3Agb2Zmc2V0PSIuNjciIHN0b3AtY29sb3I9IiMzNmM3NTIiLz48L3JhZGlhbEdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iRyIgY3g9IjI0MjQ3IiBjeT0iNzc1OCIgcj0iOTczNCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguMjgxMDkgLjk1OTY4IC0uNzgzNTMgLjIyOTQ5IDI0NTEwIC0xNjI5MikiIHhsaW5rOmhyZWY9IiNBIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM2NmViNmUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2NmViNmUiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PHBhdGggaWQ9IkgiIGQ9Ik0yNDEwNSAyMDA1M2E5MzQ1IDkzNDUgMCAwMS0xMDUzIDQ3MiAxMDIwMiAxMDIwMiAwIDAxLTM1OTAgNjQ2Yy00NzMyIDAtODg1NS0zMjU1LTg4NTUtNzQzMiAwLTExNzUgNjgwLTIxOTMgMTY0My0yNzI5LTQyODAgMTgwLTUzODAgNDY0MC01MzgwIDcyNTMgMCA3Mzg3IDY4MTAgODEzNyA4Mjc2IDgxMzcgNzkxIDAgMTk4NC0yMzAgMjcwNC00NTZsMTMwLTQ0YTEyODM0IDEyODM0IDAgMDA2NjYwLTUyODJjMjIwLTM1MC0xNjgtNzU3LTUzNS01NjV6Ii8+PHBhdGggaWQ9IkkiIGQ9Ik0xMTU3MSAyNTE0MWE3OTEzIDc5MTMgMCAwMS0yMjczLTIxMzcgODE0NSA4MTQ1IDAgMDEtMTUxNC00NzQwIDgwOTMgODA5MyAwIDAxMzA5My02Mzk1IDgwODIgODA4MiAwIDAxMTM3My04NTljMzEyLTE0OCA4NDYtNDE0IDE1NTQtNDA0YTMyMzYgMzIzNiAwIDAxMjU2OSAxMjk3IDMxODQgMzE4NCAwIDAxNjM2IDE4NjZjMC0yMSAyNDQ2LTc5NjAtODAwNS03OTYwLTQzOTAgMC04MDA0IDQxNjYtODAwNCA3ODIwIDAgMjMxOSA1MzggNDE3MCAxMjEyIDU2MDRhMTI4MzMgMTI4MzMgMCAwMDc2ODQgNjc1NyAxMjc5NSAxMjc5NSAwIDAwMzkwOCA2MTBjMTQxNCAwIDI3NzQtMjMzIDQwNDUtNjU2YTc1NzUgNzU3NSAwIDAxLTYyNzgtODAzeiIvPjxwYXRoIGlkPSJKIiBkPSJNMTYyMzEgMTU4ODZjLTgwIDEwNS0zMzAgMjUwLTMzMCA1NjYgMCAyNjAgMTcwIDUxMiA0NzIgNzIzIDE0MzggMTAwMyA0MTQ5IDg2OCA0MTU2IDg2OGE1OTU0IDU5NTQgMCAwMDMwMjctODM5IDYxNDcgNjE0NyAwIDAwMTEzMy04NTAgNjE4MCA2MTgwIDAgMDAxOTEwLTQ0MzdjMjYtMjI0Mi03OTYtMzczMi0xMTMzLTQzOTItMjEyMC00MTQxLTY2OTQtNjUyNS0xMTY2OC02NTI1LTcwMTEgMC0xMjcwMyA1NjM1LTEyNzk4IDEyNjIwIDQ3LTM2NTQgMzY3OS02NjA1IDc5OTYtNjYwNSAzNTAgMCAyMzQ2IDM0IDQyMDAgMTAwNyAxNjM0IDg1OCAyNDkwIDE4OTQgMzA4NiAyOTIxIDYxOCAxMDY3IDcyOCAyNDE1IDcyOCAyOTUycy0yNzEgMTMzMy03ODAgMTk5MHoiLz48dXNlIGZpbGw9InVybCgjQikiIHhsaW5rOmhyZWY9IiNIIi8+PHVzZSBmaWxsPSJ1cmwoI0QpIiBvcGFjaXR5PSIuMzUiIHhsaW5rOmhyZWY9IiNIIi8+PHVzZSBmaWxsPSJ1cmwoI0MpIiB4bGluazpocmVmPSIjSSIvPjx1c2UgZmlsbD0idXJsKCNFKSIgb3BhY2l0eT0iLjQiIHhsaW5rOmhyZWY9IiNJIi8+PHVzZSBmaWxsPSJ1cmwoI0YpIiB4bGluazpocmVmPSIjSiIvPjx1c2UgZmlsbD0idXJsKCNHKSIgeGxpbms6aHJlZj0iI0oiLz48L3N2Zz4=';

        const picker = document.createElement('div');
        picker.id = 'edgedl-picker';
        picker.innerHTML = `
        <div class="edgedl-bg"></div>
        <div class="edgedl-card">
            <h3>选择下载器</h3>
            <div class="edgedl-options">
                <button data-pkg="idm.internet.download.manager" data-check="idm">
                    <img src="${idmIcon}" /> 1DM
                </button>
                <button data-pkg="${DOWNLOADERS.IDM}" data-check="idmplus">
                    <img src="${idmPlusIcon}" /> 1DM+
                </button>
                <button data-pkg="adm" data-check="adm">
                    <img src="${admIcon}" /> ADM
                </button>
                <button data-pkg="edge">
                    <img src="${edgeIcon}" /> Edge
                </button>
            </div>
        </div>
    `;

        document.body.appendChild(picker);

        // 注入下载器选择弹窗样式
        const style = document.createElement('style');
        style.textContent = `  
        #edgedl-picker { position: fixed; inset: 0; display: flex; justify-content: center; align-items: center; z-index: 999999; }  
        #edgedl-picker .edgedl-bg { position: absolute; inset:0; background: rgba(0,0,0,0.45); backdrop-filter: blur(6px); animation: edgedl-fade-in .18s ease-out; }  
        #edgedl-picker .edgedl-card { position: relative; background: #fff; border-radius: 24px; padding: 20px; width: 260px; box-shadow: 0 10px 28px rgba(0,0,0,0.25); display: flex; flex-direction: column; align-items: center; animation: edgedl-slide-up .22s ease-out; }  
        #edgedl-picker h3 { margin: 0 0 16px 0; font-weight: 500; font-size: 16px; }  
        #edgedl-picker .edgedl-options { display: flex; flex-direction: column; width: 100%; gap: 10px; }  
        #edgedl-picker .edgedl-options button { display: flex; align-items: center; gap: 10px; padding: 10px; border: none; border-radius: 8px; background: #f2f2f2; font-weight: 500; cursor: pointer; transition: background 0.2s; }  
        #edgedl-picker .edgedl-options button:hover { background: #e0e0e0; }  
        #edgedl-picker .edgedl-options img { width: 24px; height: 24px; }  

        @keyframes edgedl-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes edgedl-slide-up {
            from { opacity: 0; transform: translateY(18px) scale(.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
    `;
        document.head.appendChild(style);

        // 点击唤起
        picker.querySelectorAll('button').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                const pkg = btn.dataset.pkg;
                switch(pkg){
                    case 'idm.internet.download.manager':
                    case DOWNLOADERS.IDM:
                        showToast(`⚡ ${btn.textContent.trim()} 正在唤起`);
                        openIDM(url, pkg);
                        break;
                    case 'adm':
                        showToast('⚡ ADM 正在唤起');
                        openADM(url);
                        break;
                    case 'edge':
                        showToast('⚡ Edge 内置下载');
                        window.location.href = url;
                        break;
                }
                picker.remove();
            });
        });

        // 点击背景关闭
        picker.querySelector('.edgedl-bg').addEventListener('click', ()=>{
            picker.remove();
        });
    }

    // 全局点击拦截下载
    document.addEventListener('click', e => {
        let target = e.target;
        while (target && target.tagName !== 'A') target = target.parentElement;
        if (!target) return;

        const url = target.href;
        if (isDownloadLink(url)) {
            e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();

            // 弹出下载选择器供用户选择下载器
            showDownloadPicker(url);
        }
    }, true);

})();
