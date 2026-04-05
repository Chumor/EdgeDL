import { openDownload } from '../adapter/factory.js';
import { DOWNLOADERS } from '../core/config.js';
import { getEdgeDLVersion } from '../core/config.js';
import { showToast } from './toast.js';
import { downloaderIcons } from './assets/icons.js';
import { isCurrentSiteBlacklisted } from '../core/blacklist.js';

const DEFAULT_KEY = 'edgedl-default-downloader';
const DEFAULT_PENDING_KEY = 'edgedl-default-pending';

export async function showDownloadPicker(url, callback, mode = 'download') {
    if (document.getElementById('edgedl-picker')) return;

    const idmIcon = downloaderIcons.IDM;
    const idmPlusIcon = downloaderIcons.IDM_PLUS;
    const admIcon = downloaderIcons.ADM;
    const abdmIcon = downloaderIcons.ABDM;
    const fdmIcon = downloaderIcons.FDM;
    const edgeIcon = downloaderIcons.EDGE;

    const picker = document.createElement('div');
    picker.id = 'edgedl-picker';
    picker.innerHTML = `
        <div class="edgedl-bg"></div>
        <div class="edgedl-card">
            <h3>选择下载器</h3>
            <div class="edgedl-version-tag">EdgeDL v${getEdgeDLVersion()}</div>
            <div class="edgedl-options">
                <button data-pkg="${DOWNLOADERS.IDM}">
                    <img src="${idmIcon}" /> 1DM
                </button>
                <button data-pkg="${DOWNLOADERS.IDM_PLUS || DOWNLOADERS.IDM}">
                    <img src="${idmPlusIcon}" /> 1DM+
                </button>
                <button data-pkg="${DOWNLOADERS.ADM}">
                    <img src="${admIcon}" /> ADM
                </button>
                <button data-pkg="${DOWNLOADERS.ABDM}">
                    <img src="${abdmIcon}" /> ABDM
                </button>
                <button data-pkg="${DOWNLOADERS.FDM}">
                    <img src="${fdmIcon}" /> FDM
                </button>
                <button data-pkg="edge">
                    <img src="${edgeIcon}" /> Edge
                </button>
            </div>
            <label style="margin-top: 12px; display: flex; align-items: center; gap: 6px; font-size: 13px;">
                <input type="checkbox" id="edgedl-set-default" /> 设为默认下载器
            </label>
        </div>
    `;

    document.documentElement.appendChild(picker);

    const layoutPicker = () => {
        const w = window.visualViewport ? visualViewport.width : document.documentElement.clientWidth;
        const card = picker.querySelector('.edgedl-card');
        if (card) card.style.maxWidth = (w - 32) + 'px';
    };
    layoutPicker();

    if (window.visualViewport) {
        visualViewport.addEventListener('resize', layoutPicker);
        visualViewport.addEventListener('scroll', layoutPicker);
    }

    const style = document.createElement('style');
    style.textContent = `
        #edgedl-picker {
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
        }

        #edgedl-picker .edgedl-bg {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.42);
            backdrop-filter: blur(12px) saturate(140%);
            -webkit-backdrop-filter: blur(12px) saturate(140%);
            animation: edgedl-fade-in 0.18s ease-out;
            pointer-events: auto;
        }

        #edgedl-picker .edgedl-card {
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
            animation: edgedl-slide-up 0.22s ease-out;
            pointer-events: auto;
            box-sizing: border-box;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-weight: 400;
            line-height: 1.4;
            -webkit-font-smoothing: antialiased;
        }

        #edgedl-picker h3 {
            margin: 8px 0 18px 0;
            font-weight: 600;
            font-size: 16px;
            color: #333;
        }

        #edgedl-picker .edgedl-version-tag {
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

        #edgedl-picker .edgedl-options {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 12px;
        }

        #edgedl-picker .edgedl-options button {
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

        #edgedl-picker .edgedl-options button:hover {
            background: #e0e0e0;
        }

        #edgedl-picker .edgedl-options img {
            width: 24px;
            height: 24px;
        }

        #edgedl-picker .edgedl-options button.selected {
            outline: 2px solid #4CAF50;
        }

        @media (prefers-color-scheme: dark) {
            #edgedl-picker .edgedl-card {
                background: #292929;
                color: #FFFFFF;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
            }

            #edgedl-picker .edgedl-options button {
                background: #383838;
                color: #FFFFFF;
            }
        }

        @keyframes edgedl-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes edgedl-slide-up {
            from { opacity: 0; transform: translateY(18px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes edgedl-fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
        }

        @keyframes edgedl-slide-down {
            from { opacity: 1; transform: translateY(0) scale(1); }
            to { opacity: 0; transform: translateY(18px) scale(0.98); }
        }

        #edgedl-picker.closing .edgedl-bg {
            animation: edgedl-fade-out 0.16s ease-in forwards;
        }

        #edgedl-picker.closing .edgedl-card {
            animation: edgedl-slide-down 0.18s ease-in forwards;
        }
    `;
    document.head.appendChild(style);

    // 读取默认下载器
    const defaultDownloader = await GM_getValue(DEFAULT_KEY, null);
    const defaultCheckbox = picker.querySelector('#edgedl-set-default');
    defaultCheckbox.checked = !!defaultDownloader;

    if (defaultDownloader) {
        // 高亮默认下载器按钮
        const defaultBtn = picker.querySelector(`button[data-pkg="${defaultDownloader}"]`);
        if (defaultBtn) defaultBtn.classList.add('selected');
    }

    // 当复选框变化时立即保存或清除“待设置”标志
    defaultCheckbox.addEventListener('change', async () => {
        if (defaultCheckbox.checked) {
            await GM_setValue(DEFAULT_PENDING_KEY, true);
        } else {
            await GM_deleteValue(DEFAULT_KEY);
            await GM_deleteValue(DEFAULT_PENDING_KEY);
        }
    });

    // 点击唤起
    picker.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', async () => {
            const pkg = btn.dataset.pkg;
            const pending = await GM_getValue(DEFAULT_PENDING_KEY, false);

            // 若复选框已勾选或之前标记为“待设置”，保存为默认
            if (mode === 'config') {
                await GM_setValue(DEFAULT_KEY, pkg);
                await GM_deleteValue(DEFAULT_PENDING_KEY);
            }

            if (pkg === 'edge') {
                await GM_deleteValue(DEFAULT_PENDING_KEY);
            } else if (defaultCheckbox.checked || pending) {
                await GM_setValue(DEFAULT_KEY, pkg);
                await GM_deleteValue(DEFAULT_PENDING_KEY);
            }

            if (mode === 'config') {
                if (typeof callback === 'function') callback(pkg);
                gotoClose();
                return;
            }

            if (typeof callback === 'function') callback(pkg);

            openDownload(url, pkg);

            picker.classList.add('closing');
            picker.addEventListener('animationend', () => {
                if (window.visualViewport) {
                    visualViewport.removeEventListener('resize', layoutPicker);
                    visualViewport.removeEventListener('scroll', layoutPicker);
                }
                picker.remove();
                style.remove();
                window.dispatchEvent(new CustomEvent('edgedl:picker-closed'));
            }, { once: true });
        });
    });

    function gotoClose() {
        picker.classList.add('closing');
        picker.addEventListener('animationend', () => {
            if (window.visualViewport) {
                visualViewport.removeEventListener('resize', layoutPicker);
                visualViewport.removeEventListener('scroll', layoutPicker);
            }
            picker.remove();
            style.remove();
            window.dispatchEvent(new CustomEvent('edgedl:picker-closed'));
        }, { once: true });
    }

    picker.querySelector('.edgedl-bg').addEventListener('click', gotoClose);
}