import { isDownloadLink } from './detector.js';
import { openDownload } from './intent/factory.js';
import { showToast } from './toast.js';
import { selectedDownloader } from './config.js';
import { showDownloadPicker } from './download-picker.js';

// 全局点击拦截下载
document.addEventListener('click', e => {
    let target = e.target;
    while (target && target.tagName !== 'A') target = target.parentElement;
    if (!target) return;

    const url = target.href;
    if (isDownloadLink(url)) {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();

        // 弹出下载选择器供用户选择下载器
        showDownloadPicker(url, selected => {
            showToast(`⚡ ${selected} 正在唤起`);
            openDownload(url, selected);
        });
    }
}, true);