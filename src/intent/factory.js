import { openIDM } from './idm.js';
import { openADM } from './adm.js';
import { DOWNLOADERS } from '../config.js';
import { showToast } from '../toast.js';

// 调用指定下载器下载
export function openDownload(url, downloader) {
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
            window.open(url, '_blank');
            break;
    }
}