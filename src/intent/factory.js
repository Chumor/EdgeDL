import { openIDM } from './idm.js';
import { openADM } from './adm.js';
import { openABDM } from './abdm.js';
import { DOWNLOADERS } from '../config.js';
import { showToast } from '../toast.js';
import { isCurrentSiteBlacklisted } from '../blacklist.js';

// 调用指定下载器下载
export async function openDownload(url, downloader) {
    if (await isCurrentSiteBlacklisted()) { showToast('黑名单：下载已阻止'); return; }
    switch (downloader) {
        case DOWNLOADERS.IDM:
            showToast('⚡ IDM 正在唤起');
            openIDM(url, DOWNLOADERS.IDM);
            break;

        case DOWNLOADERS.IDM_PLUS:
            showToast('⚡ IDM+ 正在唤起');
            openIDM(url, DOWNLOADERS.IDM_PLUS);
            break;

        case DOWNLOADERS.ADM:
            showToast('⚡ ADM 正在唤起');
            openADM(url);
            break;

        case DOWNLOADERS.ABDM:
            showToast('⚡ AB Download Manager 正在唤起');
            openABDM(url);
            break;

        case 'edge':
        default:
            showToast('⚡ Edge 内置下载');
            GM_download({ url, saveAs: false });
            break;
    }
}