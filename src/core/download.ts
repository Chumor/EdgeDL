import { openDownload } from '../adapter/factory';
import { showDownloadPicker } from '../components/download-picker';

export async function requestDownload(url: string) {
    if(!url) return;

    const dl = GM_getValue('edgedl-default-downloader');

    if(dl){
        return openDownload(url, dl as string);
    }

    const selected = await new Promise<string | null>((resolve) => {
        showDownloadPicker(url, (pkg) => resolve(pkg));
    });
    if(selected){
        return openDownload(url, selected);
    }

    return null;
}