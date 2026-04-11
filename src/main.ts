/**
 * @module main
 * @description EdgeDL 核心分发器：处理全局初始化、油猴菜单注册及全局点击事件拦截。
 */
import { isDownloadLink } from './core/detector';
import { extractUrlFromOnclick } from './utils';
import { requestDownload } from './core/download';
import { registerMenu } from './components/menu';
import { showToast } from './components/toast';
import { isCurrentSiteBlacklisted } from './core/blacklist';
import { initSjqqHandler } from './handlers/sjqq';
import { initDeepSeekHandler } from './handlers/deepseek';

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

/**
 * 拦截器核心逻辑
 * @param {MouseEvent} e 事件对象
 */
async function handleClick(e: MouseEvent) {
    // @ts-ignore: 自定义属性拦截
    if (e._edgedl_handled) return;
    // @ts-ignore
    e._edgedl_handled = true;

    const target = e.target as HTMLElement;
    if (target?.closest?.('label.hope-checkbox, .hope-checkbox, .hope-checkbox__control, input[type="checkbox"]')) return;

    const link = target?.closest?.('a, [onclick]') as HTMLAnchorElement | HTMLElement;
    if (!link) return;

    let url = (link as HTMLAnchorElement).href || '';

    if (
        !url ||
        url === '#' ||
        url === '##' ||
        url.startsWith('javascript:')
    ) {
        const onclick = (link as HTMLElement).getAttribute('onclick')
            || link.closest('[onclick]')?.getAttribute('onclick');

        if (onclick) {
            url = extractUrlFromOnclick(onclick) || '';
        }
    }

    if (!url || !isDownloadLink(url)) return;

    // 命中黑名单策略：提示用户并放弃接管，交还控制权给浏览器
    if (await isCurrentSiteBlacklisted()) {
        showToast('黑名单：已跳过接管', { type: 'info', duration: 1500 });
        return; 
    }

    // 阻止浏览器原生下载与页面跳转
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    await requestDownload(url);
}
 
init();
