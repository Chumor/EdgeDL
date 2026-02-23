import { isDownloadLink } from './detector.js';
import { openDownload } from './intent/factory.js';
import { showDownloadPicker } from './download-picker.js';
import { initSjqqHandler } from './handlers/sjqq.js';
import { extractUrlFromOnclick } from './utils.js';
import { registerMenu } from './menu.js';
registerMenu();

// 读取默认下载器配置
function getDefaultDownloader() {
    return GM_getValue('edgedl-default-downloader');
}

// 初始化应用宝下载接管
initSjqqHandler();

// 拦截点击事件并接管下载
document.addEventListener('click', e => {
    if (e.defaultPrevented) return;

    if (e.__edgedl_handled__) return;
    e.__edgedl_handled__ = true;

    if (e.target?.closest?.('label.hope-checkbox, .hope-checkbox, .hope-checkbox__control, input[type="checkbox"]')) return;

    const link = e.target?.closest?.('a, [onclick]');
    if (!link) return;

    let url = link.href;

    if (
        !url ||
        url === '#' ||
        url === '##' ||
        url.startsWith('javascript:')
    ) {
        const onclick = link.getAttribute('onclick')
            || link.closest('[onclick]')?.getAttribute('onclick');

        if (onclick) {
            url = extractUrlFromOnclick(onclick);
        }
    }

    if (!url || !isDownloadLink(url)) return;

    // 阻止浏览器原生下载与页面跳转
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const defaultDownloader = getDefaultDownloader();
    if (defaultDownloader) {
        openDownload(url, defaultDownloader);
    } else {
        // 无默认配置时弹出下载器选择
        showDownloadPicker(url, selected => {
            openDownload(url, selected);
        });
    }
}, true);