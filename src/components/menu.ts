/**
 * @module components/menu
 * @description 脚本菜单管理器：负责集成油猴原生菜单指令，提供配置入口及黑名单管理接口。
 */
import { showDownloadPicker } from './download-picker';
import { toggleCurrentSite } from '../core/blacklist';

let menuRegistered = false;

export function registerMenu() {
    if (menuRegistered) return;
    if (typeof GM_registerMenuCommand !== 'function') return;

    // 更改默认下载器
    GM_registerMenuCommand('更改默认下载器', () => {
        showDownloadPicker('', () => {}, 'config');
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