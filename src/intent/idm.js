import { DOWNLOADERS } from '../config.js';

export function openIDM(url, packageName) {
    const scheme = url.startsWith('https') ? 'https' : 'http';
    const cleanLink = url.replace(/^https?:\/\//, '');
    const intentUrl = `intent://${cleanLink}#Intent;scheme=${scheme};package=${packageName};type=*/*;end`;
    window.location.href = intentUrl;
}