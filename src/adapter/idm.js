import { DOWNLOADERS } from '../core/config.js'

export async function openIDM(url, packageName = DOWNLOADERS.IDM) {
    const scheme = url.startsWith('https') ? 'https' : 'http';
    const cleanLink = url.replace(/^https?:\/\//, '');
    const intentUrl = `intent://${cleanLink}#Intent;scheme=${scheme};package=${packageName};type=*/*;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`
    window.location.href = intentUrl;
}