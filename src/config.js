// 下载器用户配置
export const DOWNLOADERS = {
    IDM: 'idm.internet.download.manager.plus',
    ADM: 'com.dv.adm',
};

// 默认下载器
export let selectedDownloader = GM_getValue('edgedl-default-downloader') || DOWNLOADERS.IDM;

// 设置默认下载器
export function setDefaultDownloader(pkg) {
    selectedDownloader = pkg;
    GM_setValue('edgedl-default-downloader', pkg);
}

// 重置默认下载器
export function resetDefaultDownloader() {
    selectedDownloader = DOWNLOADERS.IDM;
    GM_deleteValue('edgedl-default-downloader');
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
    '/down/','/download/','/downloads/','/dl/','/get/','/fetch/',
    '/files/','/file/','/attach/','/attachment/','/media/','/static/',
    '/assets/','/cdn/','/dist/','/repo/','/backup/','/upload/',
    '/releases/download/','/binary/','/pkg/',
    '?file=','&file=','?filename=','&filename=','?f=','&f=',
    'download?','&download=','?download=','&download=',
    'token=','auth_key=','download_token=','sig=','signature=',
    'force_download','response-content-disposition=',
    'content-disposition=attachment'
];