/**
 * @module core/download
 * @description 下载请求控制器：负责处理下载任务的调度、默认下载器校验及分发逻辑。
 */
import { openDownload } from '../adapter/factory';
import { showDownloadPicker } from '../components/download-picker';
import { DEFAULT_DOWNLOADER_KEY } from './config';

export async function requestDownload(url: string) {
    if(!url) return;

    const dl = await GM_getValue(DEFAULT_DOWNLOADER_KEY);

    if(dl){
        return openDownload(url, dl as string);
    }

    const selected = await new Promise<string | null>((resolve) => {
        showDownloadPicker(resolve);
    });
    if(selected){
        return openDownload(url, selected);
    }

    return null;
}