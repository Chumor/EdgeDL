import { selectedDownloader, DOWNLOADERS } from './config.js';

export function showToast(message, duration = 1500) {
    try {
        const downloaderName = selectedDownloader === DOWNLOADERS.IDM ? 'IDM+' : 'ADM';
        const toastMessage = message || `⚡ ${downloaderName} 正在唤起...`;

        const toast = document.createElement('div');
        toast.textContent = toastMessage;
        toast.style.cssText = `
            position: fixed;
            bottom: 15%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.85);
            color: #fff;
            font-weight: 500;
            font-size: 13px;
            padding: 10px 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 999999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        }, duration);
    } catch (err) {
        console.warn('Toast 创建失败', err);
    }
}