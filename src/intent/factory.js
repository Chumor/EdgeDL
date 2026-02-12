import { openIDM } from './idm.js';
import { openADM } from './adm.js';
import { DOWNLOADERS, selectedDownloader } from '../config.js';
import { showToast } from '../toast.js';

// 用户自定义选择弹窗
export function openDownload(url) {
    const choice = prompt(
        '选择下载器:\n1. 1DM\n2. 1DM+\n3. ADM\n4. Edge',
        '1'
    );

    switch(choice) {
        case '1':
            showToast('⚡ 1DM 正在唤起');
            openIDM(url, 'idm.internet.download.manager');
            break;
        case '2':
            showToast('⚡ 1DM+ 正在唤起');
            openIDM(url, DOWNLOADERS.IDM);
            break;
        case '3':
            showToast('⚡ ADM 正在唤起');
            openADM(url);
            break;
        case '4':
            showToast('⚡ Edge 内置下载');
            window.location.href = url;
            break;
        default:
            showToast('⚡ 默认使用 IDM+');
            openIDM(url, DOWNLOADERS.IDM);
            break;
    }
}