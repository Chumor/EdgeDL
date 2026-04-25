/**
 * @module main
 * @description EdgeDL 核心分发器：处理全局初始化、油猴菜单注册及全局点击事件拦截。
 */
import { registerMenu } from './components/menu';
import { attachPageBridgeInterceptor } from './core/intercept';
import { initSjqqHandler } from './handlers/sjqq';
import { initDeepSeekHandler } from './handlers/deepseek';

// 初始化下载接管
function init() {
    attachPageBridgeInterceptor();
    registerMenu();
    initSjqqHandler();
    initDeepSeekHandler();
} 
init();
