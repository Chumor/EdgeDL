import { openIDM } from './idm.js';
import { openADM } from './adm.js';
import { DOWNLOADERS } from '../config.js';
import { showToast } from '../toast.js';
import { isCurrentSiteBlacklisted } from '../blacklist.js';

// 调用指定下载器下载
export async function openDownload(url, downloader) {
    if (await isCurrentSiteBlacklisted()) { showToast('黑名单：下载已阻止'); return; }
    switch (downloader) {
        case 'idm.internet.download.manager':
            showToast('⚡ 1DM 正在唤起');
            openIDM(url, 'idm.internet.download.manager');
            break;

        case DOWNLOADERS.IDM:
            showToast('⚡ 1DM+ 正在唤起');
            openIDM(url, DOWNLOADERS.IDM);
            break;

        case DOWNLOADERS.ADM:
            showToast('⚡ ADM 正在唤起');
            openADM(url);
            break;

        case 'edge':
        default:
            showToast('⚡ Edge 内置下载');
            GM_download({ url, saveAs: false });
            break;
    }
}