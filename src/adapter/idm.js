import { DOWNLOADERS } from '../core/config.js'
import { buildIntentUrl } from './utils.js';

export async function openIDM(url, packageName = DOWNLOADERS.IDM) {
    const intentUrl = buildIntentUrl(url, packageName);
    window.location.href = intentUrl;
}