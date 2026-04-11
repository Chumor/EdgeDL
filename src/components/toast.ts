/**
 * @module components/toast
 * @description 轻量级反馈系统：提供非侵入式的状态通知，支持系统级主题自适应及生命周期管理。
 */
let styleInjected = false;
let activeToast: HTMLElement | null = null;

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
            background: #333333;
            color: #fff;
            box-shadow: 0 4px 10px rgba(0,0,0,.25);
        }

        /* 深色模式 */
        .edgedl-toast[data-theme="dark"] {
            background: #383838;
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

/**
 * 系统主题探测
 * @returns {'dark' | 'light'} 当前系统主题模式
 */
function getTheme() {
    return window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

/**
 * 渲染全局反馈通知 (Toast)
 * @description 
 * 核心调度逻辑：
 * 1. 样式单例校验：执行 CSS 延迟注入。
 * 2. 状态锁定：执行存量实例回收，确保全局单例显示。
 * 3. 视觉特征同步：构造 DOM 实体并适配系统偏好主题。
 * 4. 生命周期管理：调度过渡动画并通过事件驱动执行资源销毁。
 * * @param {string} message - 通知正文负载
 * @param {Object} [options={}] - 配置参数对象
 * @param {number} [options.duration=900] - 持续展示时间 (ms)
 * @param {'info' | 'error'} [options.type='info'] - 通知语义类型，决定视觉特征与图标
 */
export function showToast(message: string, options: { duration?: number, type?: string } = {}) {
    try {
        injectStyle();

        const finalOptions = typeof options === 'number' ? { duration: options } : options;

        const {
            duration = 900,
            type = 'info'
        } = finalOptions;

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