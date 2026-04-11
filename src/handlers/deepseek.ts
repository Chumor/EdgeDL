/**
 * @module handlers/deepseek
 * @description DeepSeek 专项处理
 */
import { requestDownload } from '../core/download';

export function initDeepSeekHandler() {
    if (!location.hostname.includes('download.deepseek.com')) return;

    const APK_URL = "https://download.deepseek.com/apk/deepseek.apk";

    const takeover = (e: Event) => {
        if (!e || e.defaultPrevented) return;

        e.preventDefault?.();
        e.stopPropagation?.();
        e.stopImmediatePropagation?.();

        requestDownload(APK_URL);

        return false;
    };

    document.addEventListener('click', e => {
        const target = e.target as HTMLElement;
        if (target?.closest?.('div')?.textContent?.includes('下载 APK 文件')) takeover(e);
    }, true);

    try {
        window.open = () => {
            takeover(new Event('edgedl-deepseek'));
            return null;
        };
    } catch {}
}