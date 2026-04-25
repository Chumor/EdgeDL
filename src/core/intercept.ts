/**
 * @module core/intercept
 * @description 接管控制模块：管理站点是否允许 EdgeDL 接管下载行为，并接管页面脚本触发的下载跳转。
 */
import { requestDownload } from './download';
import { isDownloadLink } from './detector';

let skipSite = false;
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
    if (skipSite) return false;

    const url = normalizeUrl(input);
    if (!url || !isDownloadLink(url)) return false;

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
    skipSite = normalized.includes(location.hostname.toLowerCase());
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

// 接管页面脚本触发的下载跳转：window.open、location.assign/replace、动态 a.click。
export function attachPageBridgeInterceptor() {
    if (bridgeAttached) return;
    bridgeAttached = true;

    void isSiteIntercepted().then((value) => {
        skipSite = value;
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