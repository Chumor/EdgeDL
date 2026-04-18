/**
 * @module core/intercept
 * @description 接管控制模块：管理站点是否允许 EdgeDL 接管下载行为。
 */

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