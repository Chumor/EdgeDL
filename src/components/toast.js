import { selectedDownloader, DOWNLOADERS } from '../core/config.js';

let styleInjected = false;
let activeToast = null;

// 注入全局样式
function injectStyle() {
    if (styleInjected) return;
    styleInjected = true;

    const style = document.createElement('style');
    style.textContent = `
        .edgedl-toast {
            position: fixed;
            top: 64px;
            right: 12px;
            left: auto;
            bottom: auto;
            transform: translateX(20px);
            z-index: 999999;
            pointer-events: none;

            font-size: 13px;
            font-weight: 500;
            line-height: 1.4;
            padding: 7px 14px;
            border-radius: 10px;
            white-space: nowrap;

            opacity: 0;
            transition: opacity .22s ease, transform .22s ease;

            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }

        /* 浅色模式 */
        .edgedl-toast[data-theme="light"] {
            background: rgba(0, 0, 0, 0.85);
            color: #fff;
            box-shadow: 0 4px 10px rgba(0,0,0,.25);
        }

        /* 深色模式 */
        .edgedl-toast[data-theme="dark"] {
            background: #1f1f1f;
            color: #f5f5f5;
            border: 1px solid rgba(255,255,255,.08);
            box-shadow: 0 6px 16px rgba(0,0,0,.6);
        }

        /* 显示状态 */
        .edgedl-toast.show {
            opacity: 1;
            transform: translateX(0);
        }

        /* 提示类型标记 */
        .edgedl-toast[data-type="error"]::before {
            content: "⚠";
            margin-right: 6px;
            color: #f87171;
        }

        .edgedl-toast[data-type="info"]::before {
            content: "ⓘ";
            margin-right: 6px;
            opacity: .8;
        }
    `;
    document.head.appendChild(style);
}

// 获取当前深色或浅色主题
function getTheme() {
    return window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

// 显示 toast
export function showToast(message, options = {}) {
    try {
        injectStyle();

        if (typeof options === 'number') options = { duration: options };

        const {
            duration = 900,
            type = 'info'
        } = options;

        if (activeToast) activeToast.remove();

        const toast = document.createElement('div');
        toast.className = 'edgedl-toast';
        toast.dataset.theme = getTheme();
        toast.dataset.type = type;
        toast.textContent = message;

        document.body.appendChild(toast);
        activeToast = toast;

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener(
                'transitionend',
                () => {
                    toast.remove();
                    if (activeToast === toast) activeToast = null;
                },
                { once: true }
            );
        }, duration);
    } catch (err) {
        console.warn('Toast 创建失败', err);
    }
}