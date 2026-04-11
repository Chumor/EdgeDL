/**
 * @module adapter/utils
 * @description 协议构建工具：负责封装 Android 标准 Intent 协议，实现跨进程应用唤起。
 */


/**
 * 构造 Android Intent Scheme URI
 * @description
 * 该函数将标准的 Web URL 转换为 Android 系统可识别的 Intent Scheme。
 * * 协议组件解析：
 * - scheme: 原始传输协议 (http/https)
 * - package: 目标应用的唯一包名标识
 * - action: 设置为 VIEW 以触发查看行为
 * - category: 标记为 BROWSABLE 以允许从浏览器安全唤起
 * * @param {string} url - 原始下载资源链接
 * @param {string} packageName - 目标下载器的 Android 包名
 * @returns {string} 封装后的 intent:// 协议字符串
 */
export function buildIntentUrl(url: string, packageName: string): string {
    const scheme = url.startsWith('https') ? 'https' : 'http';
    const path = url.replace(/^https?:\/\//, '');
    return `intent://${path}#Intent;scheme=${scheme};package=${packageName};type=*/*;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`;
}
