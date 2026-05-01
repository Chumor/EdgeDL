/**
 * @module core/detector
 * @description 链接分析引擎：基于黑名单路径、文件后缀及特征关键字实现下载意图识别。
 */

// 下载文件后缀匹配
export const EXTENSIONS = [
    '.apk','.apks','.xapk','.apkm','.ipa','.obb','.aab',
    '.zip','.rar','.7z','.tar','.gz','.tgz','.bz2','.xz',
    '.iso','.cab','.jar','.z',
    '.mp4','.mkv','.avi','.mov','.flv','.wmv','.webm',
    '.m4v','.3gp','.ts','.mpg','.mpeg','.vob',
    '.mp3','.flac','.wav','.ogg','.m4a','.aac','.wma','.ape',
    '.pdf','.epub','.mobi','.azw3','.djvu',
    '.doc','.docx','.xls','.xlsx','.ppt','.pptx',
    '.exe','.msi','.bin','.dat','.dmg','.bat','.sh','.img',
    '.torrent'
];

// 下载链接特征匹配
export const KEYWORDS = [
    '/down/','/download/','/downloads/','/dl/','/fetch/',
    '/files/','/file/','/attach/','/attachment/','/media/','/static/',
    '/assets/','/cdn/','/dist/','/repo/','/backup/','/upload/',
    '/releases/download/','/binary/','/pkg/',
    '?file=','&file=','?filename=','&filename=',
    'download?','&download=','?download=',
    'force_download','response-content-disposition=','content-disposition=attachment'
];

// 非下载页面排除规则
const EXCLUDE_PATHS = /\/(login|reg(ister)?|sign(in|up|out)|logout|account|user|blob|src|tree)\//i;

// 下载跳转页匹配
const REDIRECT_DOWNLOAD_PAGES = [
    // 腾讯游戏
    /\/zlkdatasys\/mct\/d\/[^/?#]+\.shtml(?:[?#].*)?$/i,
    // 豌豆荚、九游
    /\/game\/downs_\d+_\d+\.html(?:[?#].*)?$/i,
    // 应用宝
    /\/\/sj\.qq\.com\/appdetail\/[^/?#]+(?:[?#].*)?$/i,
    /\/\/sj\.qq\.com\/myapp\/detail\.htm\?[^#]*(?:apkname|pkgname)=/i,
];

// 下载链接检测
export function isDownloadLink(url: string) {
    if(url?.includes('sourceforge.net/projects/') && url.includes('/files/')) return false;
    if(!url || !url.startsWith('http')) return false;
    const lowerUrl = url.toLowerCase();

    // 排除非下载页面
    if (EXCLUDE_PATHS.test(lowerUrl)) return false;

    // 下载跳转页匹配
    if (REDIRECT_DOWNLOAD_PAGES.some(pattern => pattern.test(lowerUrl))) return true;

    // 后缀匹配
    try {
        const path = new URL(url).pathname.toLowerCase();
        if (EXTENSIONS.some(ext => path.endsWith(ext))) return true;
    } catch {
        const path = lowerUrl.split('?')[0].split('#')[0];
        if (EXTENSIONS.some(ext => path.endsWith(ext))) return true;
    }

    // 关键字匹配
    return KEYWORDS.some(kw => lowerUrl.includes(kw));
}