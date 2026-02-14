import { DOWNLOADERS } from '../config.js';
import { showToast } from '../toast.js';
import { isCurrentSiteBlacklisted } from '../blacklist.js';

export async function openADM(url) {
    if (await isCurrentSiteBlacklisted()) { showToast('黑名单：下载已阻止'); return; }
    const scheme = url.startsWith('https') ? 'https' : 'http';
    const cleanLink = url.replace(/^https?:\/\//, '');
    const intentUrl = `intent://${cleanLink}#Intent;scheme=${scheme};package=${DOWNLOADERS.ADM};type=*/*;end`;
    window.location.href = intentUrl;
}