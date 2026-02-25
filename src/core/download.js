import { openDownload } from '../adapter/factory.js';
import { showDownloadPicker } from '../components/download-picker.js';

export async function requestDownload(url){
    if(!url) return;

    const dl = GM_getValue('edgedl-default-downloader');

    if(dl){
        return openDownload(url, dl);
    }

    const selected = await showDownloadPicker(url);
    if(selected){
        return openDownload(url, selected);
    }

    return null;
}