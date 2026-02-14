import { isDownloadLink } from './detector.js';
import { openDownload } from './intent/factory.js';
import { showDownloadPicker } from './download-picker.js';
import { registerMenu } from './menu.js';
registerMenu();

// 获取当前默认下载器
function getDefaultDownloader() {
    return GM_getValue('edgedl-default-downloader');
}

// 全局点击拦截下载
document.addEventListener('click', e => {
    let target = e.target;
    while (target && target.tagName !== 'A') target = target.parentElement;
    if (!target) return;

    const url = target.href;
    if (isDownloadLink(url)) {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();

        const defaultDownloader = getDefaultDownloader();
        if (defaultDownloader) {
            openDownload(url, defaultDownloader);
        } else {
            // 弹出下载选择器
            showDownloadPicker(url, selected => {
                openDownload(url, selected);
            });
        }
    }
}, true);