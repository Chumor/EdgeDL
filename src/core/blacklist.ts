const KEY = 'edgedl-blacklist';

// 获取黑名单数组
export async function getBlacklist() {
    const list = await GM_getValue(KEY, []);
    return Array.isArray(list) ? (list as string[]) : [];
}

// 保存黑名单
export async function saveBlacklist(list: string[]) {
    const normalized = list.map((i) => 
        typeof i === 'string' ? i.toLowerCase() : String(i).toLowerCase()
    );
    await GM_setValue(KEY, normalized);
    return normalized;
}

// 判断当前站点是否在黑名单
export async function isCurrentSiteBlacklisted() {
    const host = location.hostname.toLowerCase();
    const list = await getBlacklist();
    if (list.length === 0) return false;
    return list.some(item => (item as string).toLowerCase() === host);
}

// 切换当前站点黑名单状态
export async function toggleCurrentSite() {
    const host = location.hostname.toLowerCase();
    const list = await getBlacklist();

    let added;
    const index = list.findIndex(item => (item as string).toLowerCase() === host);
    if (index >= 0) {
        list.splice(index, 1);
        added = false;
    } else {
        list.push(host);
        added = true;
    }

    await saveBlacklist(list);
    return added;
}