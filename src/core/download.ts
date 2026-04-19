/**
 * @module core/download
 * @description 下载请求控制器：负责处理下载任务的调度、默认下载器校验及分发逻辑。
 */
import { openDownload } from '../adapter/factory';
import { showDownloadPicker } from '../components/download-picker';

export async function requestDownload(url: string) {
    if(!url) return;

    const dl = GM_getValue('edgedl-default-downloader');

    if(dl){
        return openDownload(url, dl as string);
    }

    const selected = await new Promise<string | null>((resolve) => {
        showDownloadPicker((pkg) => resolve(pkg));
    });
    if(selected){
        return openDownload(url, selected);
    }

    return null;
}