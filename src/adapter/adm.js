import { DOWNLOADERS } from '../core/config.js';
import { showToast } from '../components/toast.js';
import { isCurrentSiteBlacklisted } from '../core/blacklist.js';

export async function openADM(url) {
    if (await isCurrentSiteBlacklisted()) { showToast('黑名单：下载已阻止'); return; }
    const scheme = url.startsWith('https') ? 'https' : 'http';
    const cleanLink = url.replace(/^https?:\/\//, '');
    const intentUrl = `intent://${cleanLink}#Intent;scheme=${scheme};package=${DOWNLOADERS.ADM};type=*/*;end`;
    window.location.href = intentUrl;
    setTimeout(() => {
        window.location.href = intentUrl;
    }, 200);
}