import { DOWNLOADERS } from '../core/config';
import { buildIntentUrl } from './utils';

export function openDownloader(url: string, type: string) {
    if (!url || typeof url !== 'string') {
        throw new Error('Invalid URL');
    }
    const packageName = DOWNLOADERS[type as keyof typeof DOWNLOADERS];
    if (!packageName) {
        throw new Error(`Unknown downloader type: ${type}`);
    }
    const intentUrl = buildIntentUrl(url, packageName);
    window.location.href = intentUrl;
}