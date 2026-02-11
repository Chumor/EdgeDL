import { openIDM } from './idm.js';
import { openADM } from './adm.js';
import { DOWNLOADERS, selectedDownloader } from '../config.js';

// 根据用户选择唤起下载器
export function openDownload(url){
    switch(selectedDownloader){
        case DOWNLOADERS.IDM: return openIDM(url);
        case DOWNLOADERS.ADM: return openADM(url);
        default: return openIDM(url);
    }
}