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

    // 尝试从函数调用中提取参数，例如：downloadAndroidAPP()
    // 如果 onclick 中包含函数名但没有直接 URL，可能需要额外处理
    // 这里保留原有逻辑，但增加对常见下载函数名的识别提示
    if (/download|android|app/i.test(onclick)) {
        // 这是一个潜在的下载触发器，但无法从中提取 URL
        // 可以在此处添加自定义逻辑来处理特定的函数调用
    }

    return null;
}
