import { DOWNLOADERS } from '../core/config.js';
import { buildIntentUrl } from './utils.js';

export function openDownloader(url, type) {
    if (!url || typeof url !== 'string') {
        throw new Error('Invalid URL');
    }
    const packageName = DOWNLOADERS[type];
    if (!packageName) {
        throw new Error(`Unknown downloader type: ${type}`);
    }
    const intentUrl = buildIntentUrl(url, packageName);
    window.location.href = intentUrl;
}