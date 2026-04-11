/**
 * @module adapter/factory
 * @description 下载任务分发工厂，处理黑名单拦截并匹配对应的下载适配器
 */
import { openDownloader } from './launcher.js';
import { DOWNLOADERS } from '../core/config.js';
import { showToast } from '../components/toast.js';
import { isCurrentSiteBlacklisted } from '../core/blacklist.js';

/**
 * 下载器标识与唤起名称的映射表
 * @const {Object<string, string>}
 */
const DOWNLOADER_MAP = {
    [DOWNLOADERS.IDM]: 'IDM',
    [DOWNLOADERS.IDM_PLUS]: 'IDM_PLUS',
    [DOWNLOADERS.ADM]: 'ADM',
    [DOWNLOADERS.ABDM]: 'ABDM',
    [DOWNLOADERS.FDM]: 'FDM'
};

/**
 * 调用指定下载器执行下载任务
 * @async
 * @param {string} url - 目标下载链接
 * @param {string} downloader - 下载器标识 (包名或 'edge')
 * @returns {Promise<void>}
 */
export async function openDownload(url, downloader) {
    if (await isCurrentSiteBlacklisted()) {
        showToast('黑名单：下载已阻止');
        return;
    }

    const launcherKey = DOWNLOADER_MAP[downloader];
    if (launcherKey) {
        showToast(`${launcherKey} 正在唤起`);
        openDownloader(url, launcherKey);
        return;
    }

    showToast('Edge 内置下载');
    setTimeout(() => {
        window.location.href = url;
    }, 0);
}