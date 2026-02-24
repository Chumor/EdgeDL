import { isDownloadLink } from './core/detector.js';
import { extractUrlFromOnclick } from './utils.js';
import { requestDownload } from './core/download.js';
import { registerMenu } from './components/menu.js';
import { initSjqqHandler } from './handlers/sjqq.js';
import { initDeepSeekHandler } from './handlers/deepseek.js';

// 读取默认下载器配置
function getDefaultDownloader() {
    return GM_getValue('edgedl-default-downloader');
}

// 初始化下载接管
function init() {
    registerMenu();
    initSjqqHandler();
    initDeepSeekHandler();
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

    await requestDownload(url);
}
 
init();
