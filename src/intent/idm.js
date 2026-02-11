import { DOWNLOADERS } from '../config.js';

export function openIDM(url) {
    const scheme = url.startsWith('https') ? 'https' : 'http';
    const cleanLink = url.replace(/^https?:\/\//, '');
    const intentUrl = `intent://${cleanLink}#Intent;scheme=${scheme};package=${DOWNLOADERS.IDM};type=*/*;end`;
    window.location.href = intentUrl;
}