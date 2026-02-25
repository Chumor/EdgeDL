import { requestDownload } from '../core/download.js';

export function initDeepSeekHandler() {
    if (!location.hostname.includes('download.deepseek.com')) return;

    const APK_URL = "https://download.deepseek.com/apk/deepseek.apk";

    const takeover = e => {
        if (!e || e.defaultPrevented) return;

        e.preventDefault?.();
        e.stopPropagation?.();
        e.stopImmediatePropagation?.();

        requestDownload(APK_URL);

        return false;
    };

    document.addEventListener('click', e => {
        if (e.target?.closest?.('div')?.textContent?.includes('下载 APK 文件')) takeover(e);
    }, true);

    try {
        window.open = () => takeover(new Event('edgedl-deepseek'));
    } catch {}
}