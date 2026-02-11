import { isDownloadLink } from './detector.js';
import { openDownload } from './intent/factory.js';
import { showToast } from './toast.js';
import { selectedDownloader } from './config.js';

    // 全局点击拦截下载
    document.addEventListener('click', e=>{
        let target = e.target;
        while(target && target.tagName!=='A') target=target.parentElement;
        if(!target) return;
        const url = target.href;
        if(isDownloadLink(url)){
            e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
            showToast(`⚡ ${selectedDownloader} 正在唤起`);
            openDownload(url);
        }
    }, true);