/**
 * @module components/download-picker
 * @description 交互式分发控制器：提供可视化 UI 供用户选择下载目标，并处理下载器偏好设置的持久化逻辑。
 */
import { DEFAULT_DOWNLOADER_KEY, DOWNLOADERS, getEdgeDLVersion } from '../core/config';
import { downloaderIcons } from './assets/icons';

export async function showDownloadPicker(
    callback: (pkg: string | null) => void
) {
    if (document.getElementById('edgedl-picker')) {
        callback(null);
        return;
    }

    const picker = document.createElement('div');
    picker.id = 'edgedl-picker';

    const shadow = picker.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
        <div class="edgedl-bg"></div>
        <div class="edgedl-card">
            <h3>选择下载器</h3>
            <div class="edgedl-version-tag">EdgeDL v${getEdgeDLVersion()}</div>
            <div class="edgedl-options">
                <button data-pkg="${DOWNLOADERS.IDM}">
                    <img src="${downloaderIcons.IDM}" /> 1DM
                </button>
                <button data-pkg="${DOWNLOADERS.IDM_PLUS}">
                    <img src="${downloaderIcons.IDM_PLUS}" /> 1DM+
                </button>
                <button data-pkg="${DOWNLOADERS.ADM}">
                    <img src="${downloaderIcons.ADM}" /> ADM
                </button>
                <button data-pkg="${DOWNLOADERS.ABDM}">
                    <img src="${downloaderIcons.ABDM}" /> ABDM
                </button>
                <button data-pkg="${DOWNLOADERS.FDM}">
                    <img src="${downloaderIcons.FDM}" /> FDM
                </button>
                <button data-pkg="edge">
                    <img src="${downloaderIcons.EDGE}" /> Edge
                </button>
            </div>
            <label style="margin-top: 12px; display: flex; align-items: center; gap: 6px; font-size: 13px;">
                <input type="checkbox" id="edgedl-set-default" /> 设为默认下载器
            </label>
        </div>
    `;

    document.documentElement.appendChild(picker);

    const layoutPicker = () => {
        const vvp = window.visualViewport;
        const w = vvp ? vvp.width : document.documentElement.clientWidth;
        const card = shadow.querySelector('.edgedl-card') as HTMLDivElement | null;
        if (card) card.style.maxWidth = (w - 32) + 'px';
    };
    layoutPicker();

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', layoutPicker);
        window.visualViewport.addEventListener('scroll', layoutPicker);
    }

    const style = document.createElement('style');
    style.textContent = `
        :host {
            all: initial;
            position: fixed;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2147483647;
            pointer-events: none;
            contain: layout style paint;
            isolation: isolate;
            --edgedl-move-easing: cubic-bezier(0, 0, 0.2, 1);
            --edgedl-fade-easing: cubic-bezier(0.4, 0, 0.2, 1);
            --edgedl-exit-easing: cubic-bezier(0.4, 0, 1, 1);
            --edgedl-enter-duration: 300ms;
            --edgedl-fade-duration: 200ms;
            --edgedl-exit-duration: 200ms;
        }

        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        .edgedl-bg {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.42);
            backdrop-filter: blur(25px) saturate(140%);
            -webkit-backdrop-filter: blur(25px) saturate(140%);
            animation: edgedl-fade-in var(--edgedl-fade-duration) var(--edgedl-fade-easing) both;
            pointer-events: auto;
            will-change: opacity;
        }

        .edgedl-card {
            position: relative;
            background: #fff;
            border-radius: 24px;
            padding: 20px;
            width: 260px;
            max-width: 100%;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            align-items: center;
            animation: edgedl-slide-up var(--edgedl-enter-duration) var(--edgedl-move-easing) both;
            transform-origin: center bottom;
            will-change: opacity, transform;
            pointer-events: auto;
            box-sizing: border-box;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-weight: 400;
            line-height: 1.4;
            -webkit-font-smoothing: antialiased;
        }

        h3 {
            margin: 8px 0 18px 0;
            font-weight: 600;
            font-size: 16px;
            color: #333;
        }

        .edgedl-version-tag {
            position: absolute;
            top: 10px;
            right: 12px;
            font-size: 9px;
            transform: translate(0, 0);
            font-family: ui-monospace, SFMono-Regular, monospace;
            color: #888;
            background: rgba(0, 0, 0, 0.04);
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: 600;
            letter-spacing: 0.3px;
            pointer-events: none;
            border: 1px solid rgba(0, 0, 0, 0.02);
        }

        .edgedl-options {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 12px;
        }

        .edgedl-options button {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            border: none;
            border-radius: 12px;
            background: #F0F0F0;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s;
        }

        .edgedl-options button:hover {
            background: #e0e0e0;
        }

        .edgedl-options img {
            width: 24px;
            height: 24px;
        }

        .edgedl-options button.selected {
            outline: 2px solid #4CAF50;
        }

        @media (prefers-color-scheme: dark) {
            .edgedl-card {
                background: #292929;
                color: #FFFFFF;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
            }

            h3 {
                color: #F5F5F5;
            }

            .edgedl-options button {
                background: #383838;
                color: #FFFFFF;
            }
        }

        @keyframes edgedl-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes edgedl-slide-up {
            from { opacity: 0; transform: translateY(24px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes edgedl-fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
        }

        @keyframes edgedl-slide-down {
            from { opacity: 1; transform: translateY(0) scale(1); }
            to { opacity: 0; transform: translateY(12px) scale(0.98); }
        }

        :host(.closing) .edgedl-bg {
            animation: edgedl-fade-out var(--edgedl-exit-duration) var(--edgedl-exit-easing) forwards;
        }

        :host(.closing) .edgedl-card {
            animation: edgedl-slide-down var(--edgedl-exit-duration) var(--edgedl-exit-easing) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
            .edgedl-bg,
            .edgedl-card,
            :host(.closing) .edgedl-bg,
            :host(.closing) .edgedl-card {
                animation-duration: 1ms;
            }
        }
    `;
    shadow.appendChild(style);

    // 读取默认下载器
    const defaultDownloader = await GM_getValue<string | null>(DEFAULT_DOWNLOADER_KEY, null);
    const defaultCheckbox = shadow.querySelector('#edgedl-set-default') as HTMLInputElement;
    if (defaultCheckbox) defaultCheckbox.checked = !!defaultDownloader;

    if (defaultDownloader) {
        // 高亮默认下载器按钮
        const defaultBtn = shadow.querySelector(`button[data-pkg="${defaultDownloader}"]`) as HTMLButtonElement | null;
        if (defaultBtn) defaultBtn.classList.add('selected');
    }

    // 取消勾选时清除默认下载器
    defaultCheckbox.addEventListener('change', async () => {
        if (!defaultCheckbox.checked) {
            await GM_deleteValue(DEFAULT_DOWNLOADER_KEY);
        }
    });

    // 点击唤起
    shadow.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', async () => {
            const pkg = btn.dataset.pkg || '';

           // 按当前选择更新默认下载器
            if (pkg === 'edge') {
                await GM_deleteValue(DEFAULT_DOWNLOADER_KEY);
            } else if (defaultCheckbox.checked) {
                await GM_setValue(DEFAULT_DOWNLOADER_KEY, pkg);
            }

            callback(pkg);
            gotoClose(false);
        });
    });

    function gotoClose(cancelled = true) {
        if (picker.classList.contains('closing')) return;
        if (cancelled) callback(null);
        picker.classList.add('closing');

        let removed = false;
        const removePicker = () => {
            if (removed) return;
            removed = true;
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', layoutPicker);
                window.visualViewport.removeEventListener('scroll', layoutPicker);
            }
            picker.remove();
            window.dispatchEvent(new CustomEvent('edgedl:picker-closed'));
        };

        const card = shadow.querySelector('.edgedl-card') as HTMLDivElement;
        const onAnimationEnd = (event: AnimationEvent) => {
            if (event.target !== card) return;
            card.removeEventListener('animationend', onAnimationEnd);
            removePicker();
        };

        card?.addEventListener('animationend', onAnimationEnd);
        window.setTimeout(removePicker, 260);
    }

    shadow.querySelector('.edgedl-bg')?.addEventListener('click', () => gotoClose());
}