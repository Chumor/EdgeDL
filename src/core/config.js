// 下载器用户配置
export const DOWNLOADERS = {
    IDM: 'idm.internet.download.manager',
    IDM_PLUS: 'idm.internet.download.manager.plus',
    ADM: 'com.dv.adm',
    ABDM: 'com.abdownloadmanager',
    FDM: 'org.freedownloadmanager.fdm',
};

// 默认下载器
export const DEFAULT_DOWNLOADER_KEY = 'edgedl-default-downloader';
export const DEFAULT_DOWNLOADER = DOWNLOADERS.IDM;

// 当前选中的下载器
export let selectedDownloader = GM_getValue(
    DEFAULT_DOWNLOADER_KEY,
    DEFAULT_DOWNLOADER
);

// 设置默认下载器
export function setDefaultDownloader(pkg) {
    selectedDownloader = pkg;
    GM_setValue(DEFAULT_DOWNLOADER_KEY, pkg);
}

// 重置默认下载器
export function resetDefaultDownloader() {
    selectedDownloader = DEFAULT_DOWNLOADER;
    GM_deleteValue(DEFAULT_DOWNLOADER_KEY);
}

// 下载链接关键字匹配
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

// 下载链接后缀匹配
export const KEYWORDS = [
    '/down/','/download/','/downloads/','/dl/','/fetch/',
    '/files/','/file/','/attach/','/attachment/','/media/','/static/',
    '/assets/','/cdn/','/dist/','/repo/','/backup/','/upload/',
    '/releases/download/','/binary/','/pkg/',
    '?file=','&file=','?filename=','&filename=',
    'download?','&download=','?download=','&download=',
    'force_download','response-content-disposition=','content-disposition=attachment'
];