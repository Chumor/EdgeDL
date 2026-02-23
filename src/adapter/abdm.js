import { showToast } from '../components/toast.js';
import { isCurrentSiteBlacklisted } from '../core/blacklist.js';

const ABDM_PKG = 'com.abdownloadmanager';

export async function openABDM(url) {
    if (await isCurrentSiteBlacklisted()) { showToast('黑名单：下载已阻止'); return; }
    const scheme = url.startsWith('https') ? 'https' : 'http';
    const cleanLink = url.replace(/^https?:\/\//, '');
    const intentUrl = `intent://${cleanLink}#Intent;scheme=${scheme};package=${ABDM_PKG};type=*/*;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`;
    window.location.href = intentUrl;
}