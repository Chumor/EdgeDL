import { EXTENSIONS, KEYWORDS } from './config.js';

// 下载链接检测
export function isDownloadLink(url){
    if(url?.includes('sourceforge.net/projects/') && url.includes('/files/')) return false;
    if(!url || !url.startsWith('http')) return false;
    const lowerUrl = url.toLowerCase();

    // 排除非下载页面
    const EXCLUDE_PATHS = /\/(login|reg(ister)?|sign(in|up|out)|logout|account|user|blob|src|tree)\//i;
    if (EXCLUDE_PATHS.test(lowerUrl)
    ) return false;

    // 后缀匹配
    try{
        const path = new URL(url).pathname.toLowerCase();
        if(EXTENSIONS.some(ext=>path.endsWith(ext))) return true;
    }catch(e){
        const path = lowerUrl.split('?')[0].split('#')[0];
        if(EXTENSIONS.some(ext=>path.endsWith(ext))) return true;
    }

    // 关键字匹配
    return KEYWORDS.some(kw=>lowerUrl.includes(kw));
}