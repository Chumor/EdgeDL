import { showDownloadPicker } from './download-picker.js';
import { toggleCurrentSite } from '../core/blacklist.js';

let menuRegistered = false;

export function registerMenu() {
    if (menuRegistered) return;
    if (typeof GM_registerMenuCommand !== 'function') return;

    // 更改默认下载器
    GM_registerMenuCommand('更改默认下载器', () => {
        showDownloadPicker('', pkg => {
            GM_setValue('edgedl-default-downloader', pkg);
        }, 'config', { ignoreBlacklist: true });
    });

    // 加入或移出黑名单
    GM_registerMenuCommand('加入/移出黑名单（下载器接管）', async () => {
        const added = await toggleCurrentSite();
        alert(
            added
                ? '当前站点已加入黑名单'
                : '当前站点已移出黑名单'
        );
    });

    menuRegistered = true;
}