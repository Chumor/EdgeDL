// 构建 Android Intent URL
export function buildIntentUrl(url: string, packageName: string) {
    const scheme = url.startsWith('https') ? 'https' : 'http';
    const cleanLink = url.replace(/^https?:\/\//, '');
    return `intent://${cleanLink}#Intent;scheme=${scheme};package=${packageName};type=*/*;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`;
}