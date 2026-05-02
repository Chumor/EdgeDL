import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

const userscriptHeader = 
`// ==UserScript==
// @name         EdgeDL
// @namespace    https://github.com/Chumor/EdgeDL
// @version      ${pkg.version}
// @description  让 Android Edge 支持调用外部下载器接管下载任务
// @icon         https://cdn.jsdelivr.net/gh/Chumor/EdgeDL@main/assets/icons/edge.svg
// @author       Chumor
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_getResourceURL
// @grant        unsafeWindow
// @license      Apache-2.0
// @run-at       document-start
// @website      https://scriptcat.org/zh-CN/script-show-page/5391
// @supportURL   https://github.com/Chumor/EdgeDL/issues
// @downloadURL  https://github.com/Chumor/EdgeDL/releases/latest/download/EdgeDL.user.js
// @updateURL    https://github.com/Chumor/EdgeDL/releases/latest/download/EdgeDL.user.js
// @resource     icon_idm       https://cdn.jsdelivr.net/gh/Chumor/EdgeDL@main/assets/icons/idm.svg
// @resource     icon_idm_plus  https://cdn.jsdelivr.net/gh/Chumor/EdgeDL@main/assets/icons/idm-plus.svg
// @resource     icon_adm       https://cdn.jsdelivr.net/gh/Chumor/EdgeDL@main/assets/icons/adm.svg
// @resource     icon_abdm      https://cdn.jsdelivr.net/gh/Chumor/EdgeDL@main/assets/icons/abdm.svg
// @resource     icon_fdm       https://cdn.jsdelivr.net/gh/Chumor/EdgeDL@main/assets/icons/fdm.svg
// @resource     icon_edge      https://cdn.jsdelivr.net/gh/Chumor/EdgeDL@main/assets/icons/edge.svg
// ==/UserScript==

`;

/**
 * 压缩模板字符串资产和特定的配置常量
 * @returns {import('rollup').Plugin}
 */
const optimizeSource = () => ({
  name: 'optimize-source',
  renderChunk(code) {
    let hasChanged = false;

    // 移除 JSDoc 块注释
    let currentCode = code.replace(/^[^\S\r\n]*\/\*\*[\s\S]*?\*\/\r?\n?/gm, () => {
      hasChanged = true;
      return '';
    });

    // 处理模板字符串 (CSS/HTML)
    currentCode = currentCode.replace(/`([\s\S]+?)`/g, (match, content) => {
      const trimmed = content.trim();
      
      // 匹配 CSS
      if (trimmed.includes('{') && trimmed.includes(':')) {
        hasChanged = true;
        const css = content
          .replace(/\/\*[\s\S]*?\*\//g, '') // 移除注释
          .replace(/\s+/g, ' ')             // 合并空格
          .replace(/\s*([{:;},>])\s*/g, '$1') // 移除符号周围空格
          .trim();
        return `\`${css}\``;
      }

      // 匹配 HTML
      if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
        hasChanged = true;
        const html = content
          .replace(/>\s+</g, '><')          // 移除标签间空格
          .replace(/\s{2,}/g, ' ')          // 合并多余空格
          .trim();
        return `\`${html}\``;
      }

      return match;
    });

    // 处理特定的变量配置 (EXTENSIONS, KEYWORDS, DOWNLOADERS)
    const finalCode = currentCode.replace(
      /\b(const|let|var)\s+(EXTENSIONS|KEYWORDS|DOWNLOADERS)\s*=\s*([\[{])([\s\S]+?)([\]}])/g,
      (_, kind, name, open, body, close) => {
        hasChanged = true;
        const flattened = body.split('\n').map(s => s.trim()).filter(Boolean).join('');
        return `${kind} ${name}=${open}${flattened}${close}`;
      }
    );

    return hasChanged ? { code: finalCode, map: null } : null;
  },
});

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/EdgeDL.user.js',
    format: 'iife',
    name: 'EdgeDL',
    banner: userscriptHeader,
    extend: true
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      compilerOptions: { importHelpers: true }
    }),
    optimizeSource()
  ]
};
