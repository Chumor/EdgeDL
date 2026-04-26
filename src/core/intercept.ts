/**
 * @module core/intercept
 * @description 接管控制模块：管理站点是否允许 EdgeDL 接管下载行为，并接管页面脚本触发的下载跳转。
 */
import { requestDownload } from './download';
import { isDownloadLink } from './detector';
import { showToast } from '../components/toast';
import { extractUrlFromOnclick } from '../utils';

let interceptEnabled = true;
let downloadGestureUntil = 0;
let bridgeAttached = false;

type PageWindow = Window & typeof globalThis;

function getPageWindow() {
    return ((globalThis as typeof globalThis & { unsafeWindow?: PageWindow }).unsafeWindow || window) as PageWindow;
}

function normalizeUrl(input: unknown) {
    if (!input) return '';
    try {
        const url = new URL(String(input), location.href).href;
        return url.startsWith('http') ? url : '';
    } catch {
        return '';
    }
}

function tryInterceptNavigation(input: unknown) {
    if (!interceptEnabled) return false;

    const url = normalizeUrl(input);
    const inDownloadGesture = Date.now() <= downloadGestureUntil;
    if (!url || (!isDownloadLink(url) && !inDownloadGesture)) return false;
 
    downloadGestureUntil = 0;
    void requestDownload(url);
    return true;
}

const KEY = 'edgedl-site-intercept';

// 获取接管站点列表
export async function getInterceptSites() {
    const list = await GM_getValue(KEY, []);
    return Array.isArray(list) ? (list as string[]) : [];
}

// 保存接管站点列表
export async function setInterceptSites(list: string[]) {
    const normalized = list.map((i) => 
        typeof i === 'string' ? i.toLowerCase() : String(i).toLowerCase()
    );
    await GM_setValue(KEY, normalized);
    interceptEnabled = !normalized.includes(location.hostname.toLowerCase());
    return normalized;
}

// 判断当前站点是否允许接管
export async function isSiteIntercepted() {
    const host = location.hostname.toLowerCase();
    const list = await getInterceptSites();
    if (list.length === 0) return false;
    return list.some(item => (item as string).toLowerCase() === host);
}

// 切换当前站点接管状态
export async function toggleSiteIntercept() {
    const host = location.hostname.toLowerCase();
    const list = await getInterceptSites();

    let added;
    const index = list.findIndex(item => (item as string).toLowerCase() === host);
    if (index >= 0) {
        list.splice(index, 1);
        added = false;
    } else {
        list.push(host);
        added = true;
    }

    await setInterceptSites(list);
    return added;
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
 
    if (target?.closest?.('[class*="download" i], [id*="download" i]')) {
        downloadGestureUntil = Date.now() + 1500;
    }

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

    // 命中接管排除策略：跳过 EdgeDL 接管并提示，交还浏览器默认行为
    if (await isSiteIntercepted()) {
        showToast('已跳过接管', { type: 'info', duration: 1500 });
        return; 
    }

    // 阻止浏览器原生下载与页面跳转
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    await requestDownload(url);
}


// 接管页面脚本触发的下载跳转
export function attachPageBridgeInterceptor() {
    if (bridgeAttached) return;
    bridgeAttached = true;

    attachClickInterceptor();

    void isSiteIntercepted().then((value) => {
        interceptEnabled = !value;
    });

    const pageWindow = getPageWindow();

    const originalOpen = pageWindow.open;
    pageWindow.open = function patchedOpen(url?: string | URL, target?: string, features?: string) {
        if (tryInterceptNavigation(url)) return null;
        return originalOpen.call(pageWindow, url, target, features);
    } as typeof window.open;

    try {
        const originalClick = pageWindow.HTMLAnchorElement.prototype.click;
        pageWindow.HTMLAnchorElement.prototype.click = function patchedClick(this: HTMLAnchorElement) {
            if (tryInterceptNavigation(this.href)) return;
            return originalClick.call(this);
        };
    } catch {}

    (['assign', 'replace'] as const).forEach((method) => {
        try {
            const original = pageWindow.Location.prototype[method];
            (pageWindow.Location.prototype as unknown as Record<typeof method, typeof original>)[method] =
                function patchedLocation(this: Location, url: string | URL) {
                    if (tryInterceptNavigation(url)) return;
                    return original.call(this, url);
                } as typeof original;
        } catch {}
    });
}