import { openDownloader } from './launcher.js';
import { DOWNLOADERS } from '../core/config.js';
import { showToast } from '../components/toast.js';
import { isCurrentSiteBlacklisted } from '../core/blacklist.js';

// 调用指定下载器下载
export async function openDownload(url, downloader) {
    if (await isCurrentSiteBlacklisted()) { showToast('黑名单：下载已阻止'); return; }
    switch (downloader) {
        case DOWNLOADERS.IDM:
            showToast('IDM 正在唤起');
            openDownloader(url, 'IDM');
            break;

        case DOWNLOADERS.IDM_PLUS:
            showToast('IDM+ 正在唤起');
            openDownloader(url, 'IDM_PLUS');
            break;

        case DOWNLOADERS.ADM:
            showToast('ADM 正在唤起');
            openDownloader(url, 'ADM');
            break;

        case DOWNLOADERS.ABDM:
            showToast('ABDM 正在唤起');
            openDownloader(url, 'ABDM');
            break;

        case DOWNLOADERS.FDM:
            showToast('FDM 正在唤起');
            openDownloader(url, 'FDM');
            break;

        case 'edge':
        default:
            showToast('Edge 内置下载');
            setTimeout(() => {
                window.location.href = url;
            }, 0);
            break;
    }
}