import { showDownloadPicker } from '../download-picker.js';
import { openDownload } from '../intent/factory.js';

export function initSjqqHandler() {
    if (location.hostname !== 'sj.qq.com') return;

    // 识别下载触发元素
    function isDownloadTrigger(el) {
        if (!el) return false;
        return !!el.closest?.(
            [
                '[dt-eid="safe_download"]',
                '[dt-eid="common_download"]',
                '[class*="Download"]',
                '[class*="download"]',
                '[class*="GameCard"][class*="Button"]',
                '[class*="mobileDownload"]'
            ].join(',')
        );
    }

    // 阻断并接管下载
    function takeover(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const url = location.href;

        const defaultDownloader = GM_getValue('edgedl-default-downloader');
        if (defaultDownloader) {
            openDownload(url, defaultDownloader);
        } else {
            showDownloadPicker(url, selected => {
                openDownload(url, selected);
            });
        }

        return false;
    }

    const EVENTS = [
        'pointerdown',
        'pointerup',
        'touchstart',
        'touchend',
        'mousedown',
        'mouseup',
        'click'
    ];

    EVENTS.forEach(type => {
        document.addEventListener(
            type,
            e => {
                if (e.defaultPrevented) return;
                if (!isDownloadTrigger(e.target)) return;
                takeover(e);
            },
            true
        );
    });

    // 兜底拦截脚本触发的下载
    try {
        window.open = function () {
            takeover(new Event('edgedl-sjqq'));
            return null;
        };
    } catch {}
}