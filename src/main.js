<<<<<<< HEAD
import { isDownloadLink } from './core/detector.js';
import { openDownload } from './adapter/factory.js';
import { showDownloadPicker } from './components/download-picker.js';
import { initSjqqHandler } from './handlers/sjqq.js';
import { extractUrlFromOnclick } from './utils.js';
import { registerMenu } from './components/menu.js';

// 读取默认下载器配置
function getDefaultDownloader() {
    return GM_getValue('edgedl-default-downloader');
}

// 初始化下载接管
function init() {
    registerMenu();
    initSjqqHandler();
    attachClickInterceptor();
}

// 挂载点击拦截器
function attachClickInterceptor() {
    document.addEventListener('click', handleClick, true);
}

// 点击事件处理
async function handleClick(e) {
    if (e.defaultPrevented) return;
    if (e.__edgedl_handled__) return;
    e.__edgedl_handled__ = true;

<<<<<<< HEAD
    if (e.target?.closest?.('label.hope-checkbox, .hope-checkbox, .hope-checkbox__control, input[type="checkbox"]')) return;

    const link = e.target?.closest?.('a, [onclick]');
    if (!link) return;

=======
    const link = e.target?.closest?.('a, [onclick]');
    if (!link) return;

>>>>>>> origin/main
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

    const defaultDownloader = await getDefaultDownloader();

    if (defaultDownloader) {
        await openDownload(url, defaultDownloader);
        return;
    }

    // 无默认下载器时弹出选择器
    const selected = await showDownloadPicker(url);
    if (selected) {
        await openDownload(url, selected);
    }
}
 
init();
