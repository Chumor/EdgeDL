/**
 * @module components/menu
 * @description 脚本菜单管理器：负责集成油猴原生菜单指令，提供配置入口及站点接管管理接口。
 */
import { showDownloadPicker } from './download-picker';
import { toggleSiteIntercept } from '../core/intercept';
import { showToast } from './toast';

let menuRegistered = false;

export function registerMenu() {
    if (menuRegistered) return;
    if (typeof GM_registerMenuCommand !== 'function') return;

    // 更改默认下载器
    GM_registerMenuCommand('更改默认下载器', () => {
        showDownloadPicker(() => { });
    });

    // 切换站点接管状态
    GM_registerMenuCommand('切换本站接管状态', async () => {
        const added = await toggleSiteIntercept();
        showToast(
            added ? '已禁止接管本站' : '已允许接管本站',
            { type: 'info', duration: 1500 }
        );
    });

    menuRegistered = true;
}