import { openIDM } from './intent/idm.js';
import { openADM } from './intent/adm.js';
import { DOWNLOADERS } from './config.js';
import { showToast } from './toast.js';

export function showDownloadPicker(url, callback) {
    if(document.getElementById('edgedl-picker')) return;

    const idmIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAxOTIgMTkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE5MiAxOTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik00NS45IDg4LjJjMCAxLjItLjcgMi4xLTEuOSAyLjMtMTMuMiAyLjktMjIuNSAxNC44LTIyIDI4IC4zIDcuNCAzLjggMTQuNCA5LjMgMTkuNCA1LjggNS4yIDEyLjggNyAyMC40IDYuOSAxMC0uMSAyMC4yIDAgMzAuNCAwaDU4LjNjOC43IDAgMTYuMS0yLjMgMjIuMS04LjggNS40LTUuOCA4LjQtMTQgNy4zLTIxLjktMS40LTEwLjUtOS41LTE5LjYtMjAuNC0yMi42LTEuMi0uMy0xLjktMS41LTEuNy0yLjUuNi00LjUgMS4yLTE0LjItNC41LTIzLjktOC4zLTE0LTIyLjctMTYuOS0yNS0xNy4zLTEyLjktMi4zLTIyLjYgMy0yNSA0LjMtOS40IDUuNS0xMy44IDEzLjUtMTUuNyAxOC0uNSAxLjQtMi4xIDEuOS0zLjQgMS4yLTUuNC0zLjMtMTIuMS0zLjctMTcuNy0xLjItNi42IDMtMTAuOCAxMC4zLTEwLjUgMTguMXptNTUuOC03Ljd2MjkuM0wxMTQgOTcuNWwtMTIuMyAxMi4zLTEyLjMtMTIuM20tNS4yIDI3LjdoMzUiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMCIvPjwvc3ZnPg==';
    const idmPlusIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAxOTIgMTkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE5MiAxOTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik00NC43IDEwMC4zYzAgMS4xLS43IDItMS44IDIuMi0xMi41IDIuNy0yMS40IDE0LjEtMjAuOSAyNi42LjMgNyAzLjYgMTMuNyA4LjggMTguNCA1LjUgNC45IDEyLjEgNi42IDE5LjQgNi41IDkuNS0uMSAxOS4yIDAgMjguOCAwaDU1LjNjOC4yIDAgMTUuMy0yLjIgMjEtOC4zIDUuMS01LjUgNy45LTEzLjMgNi45LTIwLjgtMS4zLTkuOS05LTE4LjYtMTkuNC0yMS41LTEuMS0uMy0xLjgtMS40LTEuNi0yLjQuNi00LjMgMS4xLTEzLjUtNC4zLTIyLjctNy44LTEzLjMtMjEuNi0xNi4xLTIzLjctMTYuNS0xMi4yLTIuMS0yMS40IDIuOS0yMy42IDQuMi04LjkgNS4yLTEzLjEgMTIuOC0xNC45IDE3LjEtLjUgMS4zLTIgMS44LTMuMiAxLjEtNS4xLTMuMS0xMS40LTMuNS0xNi44LTEuMS02LjMgMy0xMC4zIDkuOS0xMCAxNy4yek0xNTQuOSAzOHYzMC4xbS0xNS0xNUgxNzBNOTcuNiA5M3YyNy45bDExLjgtMTEuNy0xMS44IDExLjdMODYgMTA5LjJtLTQuNCAyNi4zaDMyIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxMjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTAiLz48L3N2Zz4=';
    const admIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9PC9zdHlsZT48L2RlZnM+PHBvbHlsaW5lIGNsYXNzPSJhIiBwb2ludHM9IjI5LjM0IDMzLjA0IDM0LjU5IDM5Ljc1IDQzLjUgMjguMzcgMzguMjYgMjguMzcgMzguMjYgMTcuMjEgMzAuOTIgMTcuMjEgMzAuOTIgMjMuODQiLz48cG9seWxpbmUgY2xhc3M9ImEiIHBvaW50cz0iMTguOTUgMjEuNTUgMTcuMDggMjEuNTUgMTcuMDggMTAuMzkgOS43NCAxMC4zOSA5Ljc0IDIxLjU1IDQuNSAyMS41NSAxMy40MSAzMi45MyAxNi4wOCAyOS41MiIvPjxwb2x5Z29uIGNsYXNzPSJhIiBwb2ludHM9IjI5LjIyIDIzLjg0IDI5LjIyIDguMjUgMTguOTUgOC4yNSAxOC45NSAyMy44NCAxMS42MyAyMy44NCAyNC4wOSAzOS43NSAzNi41NCAyMy44NCAyOS4yMiAyMy44NCIvPjwvc3ZnPg==';
    const edgeIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI3NjAwIDI3NjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48bGluZWFyR3JhZGllbnQgaWQ9IkEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIi8+PGxpbmVhckdyYWRpZW50IGlkPSJCIiB4MT0iNjg3MCIgeDI9IjI0NzA0IiB5MT0iMTg3MDUiIHkyPSIxODcwNSIgeGxpbms6aHJlZj0iI0EiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzBjNTlhNCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzExNGE4YiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJDIiB4MT0iMTYyNzIiIHgyPSI1MTMzIiB5MT0iMTA5NjgiIHkyPSIyMzEwMiIgeGxpbms6aHJlZj0iI0EiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzFiOWRlMiIvPjxzdG9wIG9mZnNldD0iLjE2IiBzdG9wLWNvbG9yPSIjMTU5NWRmIi8+PHN0b3Agb2Zmc2V0PSIuNjciIHN0b3AtY29sb3I9IiMwNjgwZDciLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDc4ZDQiLz48L2xpbmVhckdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iRCIgY3g9IjE2NzIwIiBjeT0iMTg3NDciIHI9Ijk1MzgiIHhsaW5rOmhyZWY9IiNBIj48c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1vcGFjaXR5PSIwIi8+PHN0b3Agb2Zmc2V0PSIuOTUiIHN0b3Atb3BhY2l0eT0iLjUzIi8+PHN0b3Agb2Zmc2V0PSIxIi8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9IkUiIGN4PSI3MTMwIiBjeT0iMTk4NjYiIHI9IjE0MzI0IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC4xNDg0MyAtLjk4ODkyIC43OTY4OCAuMTE5NiAtODc1OSAyNTU0MikiIHhsaW5rOmhyZWY9IiNBIj48c3RvcCBvZmZzZXQ9Ii43NiIgc3RvcC1vcGFjaXR5PSIwIi8+PHN0b3Agb2Zmc2V0PSIuOTUiIHN0b3Atb3BhY2l0eT0iLjUiLz48c3RvcCBvZmZzZXQ9IjEiLz48L3JhZGlhbEdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iRiIgY3g9IjI1MjMiIGN5PSI0NjgwIiByPSIyMDI0MyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtLjAzNzE1IC45OTkzMSAtMi4xMjgzNiAtLjA3OTEzIDEzNTc5IDM1MzApIiB4bGluazpocmVmPSIjQSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMzVjMWYxIi8+PHN0b3Agb2Zmc2V0PSIuMTEiIHN0b3AtY29sb3I9IiMzNGMxZWQiLz48c3RvcCBvZmZzZXQ9Ii4yMyIgc3RvcC1jb2xvcj0iIzJmYzJkZiIvPjxzdG9wIG9mZnNldD0iLjMxIiBzdG9wLWNvbG9yPSIjMmJjM2QyIi8+PHN0b3Agb2Zmc2V0PSIuNjciIHN0b3AtY29sb3I9IiMzNmM3NTIiLz48L3JhZGlhbEdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iRyIgY3g9IjI0MjQ3IiBjeT0iNzc1OCIgcj0iOTczNCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguMjgxMDkgLjk1OTY4IC0uNzgzNTMgLjIyOTQ5IDI0NTEwIC0xNjI5MikiIHhsaW5rOmhyZWY9IiNBIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM2NmViNmUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2NmViNmUiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PHBhdGggaWQ9IkgiIGQ9Ik0yNDEwNSAyMDA1M2E5MzQ1IDkzNDUgMCAwMS0xMDUzIDQ3MiAxMDIwMiAxMDIwMiAwIDAxLTM1OTAgNjQ2Yy00NzMyIDAtODg1NS0zMjU1LTg4NTUtNzQzMiAwLTExNzUgNjgwLTIxOTMgMTY0My0yNzI5LTQyODAgMTgwLTUzODAgNDY0MC01MzgwIDcyNTMgMCA3Mzg3IDY4MTAgODEzNyA4Mjc2IDgxMzcgNzkxIDAgMTk4NC0yMzAgMjcwNC00NTZsMTMwLTQ0YTEyODM0IDEyODM0IDAgMDA2NjYwLTUyODJjMjIwLTM1MC0xNjgtNzU3LTUzNS01NjV6Ii8+PHBhdGggaWQ9IkkiIGQ9Ik0xMTU3MSAyNTE0MWE3OTEzIDc5MTMgMCAwMS0yMjczLTIxMzcgODE0NSA4MTQ1IDAgMDEtMTUxNC00NzQwIDgwOTMgODA5MyAwIDAxMzA5My02Mzk1IDgwODIgODA4MiAwIDAxMTM3My04NTljMzEyLTE0OCA4NDYtNDE0IDE1NTQtNDA0YTMyMzYgMzIzNiAwIDAxMjU2OSAxMjk3IDMxODQgMzE4NCAwIDAxNjM2IDE4NjZjMC0yMSAyNDQ2LTc5NjAtODAwNS03OTYwLTQzOTAgMC04MDA0IDQxNjYtODAwNCA3ODIwIDAgMjMxOSA1MzggNDE3MCAxMjEyIDU2MDRhMTI4MzMgMTI4MzMgMCAwMDc2ODQgNjc1NyAxMjc5NSAxMjc5NSAwIDAwMzkwOCA2MTBjMTQxNCAwIDI3NzQtMjMzIDQwNDUtNjU2YTc1NzUgNzU3NSAwIDAxLTYyNzgtODAzeiIvPjxwYXRoIGlkPSJKIiBkPSJNMTYyMzEgMTU4ODZjLTgwIDEwNS0zMzAgMjUwLTMzMCA1NjYgMCAyNjAgMTcwIDUxMiA0NzIgNzIzIDE0MzggMTAwMyA0MTQ5IDg2OCA0MTU2IDg2OGE1OTU0IDU5NTQgMCAwMDMwMjctODM5IDYxNDcgNjE0NyAwIDAwMTEzMy04NTAgNjE4MCA2MTgwIDAgMDAxOTEwLTQ0MzdjMjYtMjI0Mi03OTYtMzczMi0xMTMzLTQzOTItMjEyMC00MTQxLTY2OTQtNjUyNS0xMTY2OC02NTI1LTcwMTEgMC0xMjcwMyA1NjM1LTEyNzk4IDEyNjIwIDQ3LTM2NTQgMzY3OS02NjA1IDc5OTYtNjYwNSAzNTAgMCAyMzQ2IDM0IDQyMDAgMTAwNyAxNjM0IDg1OCAyNDkwIDE4OTQgMzA4NiAyOTIxIDYxOCAxMDY3IDcyOCAyNDE1IDcyOCAyOTUycy0yNzEgMTMzMy03ODAgMTk5MHoiLz48dXNlIGZpbGw9InVybCgjQikiIHhsaW5rOmhyZWY9IiNIIi8+PHVzZSBmaWxsPSJ1cmwoI0QpIiBvcGFjaXR5PSIuMzUiIHhsaW5rOmhyZWY9IiNIIi8+PHVzZSBmaWxsPSJ1cmwoI0MpIiB4bGluazpocmVmPSIjSSIvPjx1c2UgZmlsbD0idXJsKCNFKSIgb3BhY2l0eT0iLjQiIHhsaW5rOmhyZWY9IiNJIi8+PHVzZSBmaWxsPSJ1cmwoI0YpIiB4bGluazpocmVmPSIjSiIvPjx1c2UgZmlsbD0idXJsKCNHKSIgeGxpbms6aHJlZj0iI0oiLz48L3N2Zz4=';

    const picker = document.createElement('div');
    picker.id = 'edgedl-picker';
    picker.innerHTML = `
        <div class="edgedl-bg"></div>
        <div class="edgedl-card">
            <h3>选择下载器</h3>
            <div class="edgedl-options">
                <button data-pkg="${DOWNLOADERS.IDM}">
                    <img src="${idmIcon}" /> 1DM
                </button>
                <button data-pkg="${DOWNLOADERS.IDM}">
                    <img src="${idmPlusIcon}" /> 1DM+
                </button>
                <button data-pkg="${DOWNLOADERS.ADM}">
                    <img src="${admIcon}" /> ADM
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

    // 注入下载器选择弹窗样式
    const style = document.createElement('style');
    style.textContent = `
        #edgedl-picker { position: fixed; inset: 0; display: flex; justify-content: center; align-items: center; z-index: 2147483647; }
        #edgedl-picker .edgedl-bg { position: absolute; inset:0; background: rgba(0,0,0,0.45); backdrop-filter: blur(6px); animation: edgedl-fade-in .18s ease-out; }
        #edgedl-picker .edgedl-card { position: relative; background: #fff; border-radius: 24px; padding: 20px; width: 260px; box-shadow: 0 10px 28px rgba(0,0,0,0.25); display: flex; flex-direction: column; align-items: center; animation: edgedl-slide-up .22s ease-out; }
        #edgedl-picker h3 { margin: 0 0 16px 0; font-weight: 500; font-size: 16px; }
        #edgedl-picker .edgedl-options { display: flex; flex-direction: column; width: 100%; gap: 12px; }
        #edgedl-picker .edgedl-options button { display: flex; align-items: center; gap: 10px; padding: 10px; border: none; border-radius: 12px; background: #f2f2f2; font-weight: 500; cursor: pointer; transition: background 0.2s; }
        #edgedl-picker .edgedl-options button:hover { background: #e0e0e0; }
        #edgedl-picker .edgedl-options img { width: 24px; height: 24px; }
        @media (prefers-color-scheme: dark) {
            #edgedl-picker .edgedl-card { background: #1E1E1E; color: #FFFFFF; box-shadow: 0 4px 16px rgba(0,0,0,0.6); border-radius: 24px; }
            #edgedl-picker .edgedl-options button { background: #2C2C2C; color: #FFFFFF; transition: background 0.2s, box-shadow 0.2s; }
            #edgedl-picker .edgedl-options button:hover { background: #3A3A3A; box-shadow: 0 2px 8px rgba(0,0,0,0.4); }
            #edgedl-picker .edgedl-options button:active { background: #4A4A4A; box-shadow: 0 1px 4px rgba(0,0,0,0.5); }
            #edgedl-picker .edgedl-options img { filter: brightness(1.5) contrast(1.2); }
            #edgedl-picker .edgedl-options button { background: #2C2C2C; color: #FFFFFF; }
        }

        @keyframes edgedl-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes edgedl-slide-up {
            from { opacity: 0; transform: translateY(18px) scale(.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
    `;
    document.head.appendChild(style);

    // 读取默认下载器
    const defaultDownloader = localStorage.getItem('edgedl-default-downloader');
    const defaultCheckbox = picker.querySelector('#edgedl-set-default');
    // 明确设置 checkbox 状态（存在则选中，否则不选中）
    defaultCheckbox.checked = !!defaultDownloader;
    if (defaultDownloader) {
        // 高亮默认下载器按钮
        const defaultBtn = picker.querySelector(`button[data-pkg="${defaultDownloader}"]`);
        if (defaultBtn) defaultBtn.classList.add('selected');
    }

    // 当复选框变化时立即保存或清除“待设置”标志（保证能在点击按钮时写入正确的包名）
    defaultCheckbox.addEventListener('change', () => {
        if (defaultCheckbox.checked) {
            // 标记为“用户希望设为默认”，但具体包名留到点击按钮时写入
            localStorage.setItem('edgedl-default-pending', '1');
        } else {
            // 取消：移除已保存的默认和待设置标志
            localStorage.removeItem('edgedl-default-downloader');
            localStorage.removeItem('edgedl-default-pending');
        }
    });
    
    // 按钮高亮样式
    style.textContent += `
        #edgedl-picker .edgedl-options button.selected {
            outline: 2px solid #4CAF50;
        }
    `;
    
    // 点击唤起
    picker.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const pkg = btn.dataset.pkg;

            // 若复选框已勾选或之前标记为“待设置”，保存为默认；否则清除默认（确保下次继续弹窗）
            if (defaultCheckbox.checked || localStorage.getItem('edgedl-default-pending')) {
                localStorage.setItem('edgedl-default-downloader', pkg);
                localStorage.removeItem('edgedl-default-pending');
            } else {
                localStorage.removeItem('edgedl-default-downloader');
            }

            // 调用回调唤起下载器
            if (typeof callback === 'function') callback(pkg);

            picker.remove();
            
            // 通知外部（例如油猴菜单注册器）弹窗已关闭，方便重注册菜单
            window.dispatchEvent(new CustomEvent('edgedl:picker-closed'));
        });
    });

    // 点击背景关闭
    picker.querySelector('.edgedl-bg').addEventListener('click', () => {
        picker.remove();
        // 通知外部（例如油猴菜单注册器）弹窗已关闭，方便重注册菜单
        window.dispatchEvent(new CustomEvent('edgedl:picker-closed'));
    });
}