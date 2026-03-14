import { DOWNLOADERS } from '../core/config.js';
import { buildIntentUrl } from './utils.js';

export function openADM(url, packageName = DOWNLOADERS.ADM) {
    const intentUrl = buildIntentUrl(url, packageName);
    window.location.href = intentUrl;
    setTimeout(() => {
        window.location.href = intentUrl;
    }, 200);
}