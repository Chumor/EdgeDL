import { showDownloadPicker } from './download-picker.js';

let menuRegistered = false;

export function registerMenu() {
    if (menuRegistered) return;
    if (typeof GM_registerMenuCommand !== 'function') return;

    GM_registerMenuCommand('更改默认下载器', () => {
        showDownloadPicker('', pkg => {
            localStorage.setItem('edgedl-default-downloader', pkg);
        });
    });

    menuRegistered = true;
}