/**
 * @module utils
 * @description 通用工具库：提供文本解析、模式识别等无状态辅助函数。
 */

/**
 * 从 HTML 属性 (onclick) 中解析下载链接
 * @description 
 * 解析逻辑：
 * 1. 扫描输入字符串中的 URI 模式。
 * 2. 匹配以 http(s) 开头且被常见 HTML 字符（引号、括号、空白）截断前的字符串片段。
 * * @param {string} onclick - 原始 onclick 属性文本
 * @returns {string | null} 解析成功的 URL 负载，匹配失败则返回 null
 */
export function extractUrlFromOnclick(onclick: string): string | null {
    if (!onclick) return null;

    /**
     * URL 提取正则
     * 排除字符集包含：双引号、单引号、左右括号及空白符
     */
    const URL_PATTERN = /(https?:\/\/[^"'()\s]+)/i;
    const match = onclick.match(URL_PATTERN);

    if (match) {
        return match[1];
    }

    return null;
}
