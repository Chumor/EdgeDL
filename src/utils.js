// 从 onclick 中解析下载 URL
export function extractUrlFromOnclick(onclick) {
    if (!onclick) return null;

    const match = onclick.match(
        /(https?:\/\/[^"'()\s]+)/i
    );

    if (match) {
        return match[1];
    }

    return null;
}