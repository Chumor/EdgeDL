/**
 * @module components/assets/icons
 * @description 下载器图标资源库
 */

const FALLBACK_ICON_BASE = 'https://cdn.jsdelivr.net/gh/Chumor/EdgeDL@main/assets/icons';

function getIconUrl(name: string, fallback: string) {
    try {
        if (typeof GM_getResourceURL === 'function') {
            return GM_getResourceURL(name);
        }
    } catch {
        // ignore
    }

    return fallback;
}

export const downloaderIcons = {
    IDM: getIconUrl('icon_idm', `${FALLBACK_ICON_BASE}/idm.svg`),
    IDM_PLUS: getIconUrl('icon_idm_plus', `${FALLBACK_ICON_BASE}/idm-plus.svg`),
    ADM: getIconUrl('icon_adm', `${FALLBACK_ICON_BASE}/adm.svg`),
    ABDM: getIconUrl('icon_abdm', `${FALLBACK_ICON_BASE}/abdm.svg`),
    FDM: getIconUrl('icon_fdm', `${FALLBACK_ICON_BASE}/fdm.svg`),
    EDGE: getIconUrl('icon_edge', `${FALLBACK_ICON_BASE}/edge.svg`),
};