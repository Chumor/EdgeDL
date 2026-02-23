import { DOWNLOADERS } from '../config.js';
import { showToast } from '../toast.js';
import { isCurrentSiteBlacklisted } from '../blacklist.js';

export async function openIDM(url, packageName = DOWNLOADERS.IDM) {
    if (await isCurrentSiteBlacklisted()) { showToast('黑名单：下载已阻止'); return; }
    const scheme = url.startsWith('https') ? 'https' : 'http';
    const cleanLink = url.replace(/^https?:\/\//, '');
    const intentUrl = `intent://${cleanLink}#Intent;scheme=${scheme};package=${packageName};type=*/*;end`;
    window.location.href = intentUrl;
}