// ==UserScript==
// @name         V2EX Polish Mobile Fix
// @namespace    https://github.com/你的用户名/仓库名
// @version      1.0.0
// @description  修复 V2EX Polish 在 iPhone Safari 上的排版错乱问题
// @author       msdurex
// @match        https://v2ex.com/*
// @match        https://*.v2ex.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=v2ex.com
// @grant        GM_addStyle
// @run-at       document-start
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/msdurex/v2ex_polish_patch/main/v2ex-mobile-fix.user.js
// @downloadURL  https://raw.githubusercontent.com/msdurex/v2ex_polish_patch/main/v2ex-mobile-fix.user.js
// ==/UserScript==


(function() {
    'use strict';

    // 1. 预注入 CSS，解决加载时的“闪烁”问题
    const css = `
        /* 强制所有宽度计算失效，统一由 CSS 控制 */
        @media screen and (max-width: 1200px) {
            #Wrapper .content, 
            .v2p-container,
            .v2p-main-container,
            #Main, .v2p-main {
                display: flex !important;
                flex-direction: column !important;
                width: 100% !important;
                max-width: 100vw !important;
                margin: 0 !important;
                padding: 0 !important;
                left: 0 !important;
                transform: none !important;
            }

            /* 修正主题和回复的宽度 */
            #Main, .v2p-main, .v2p-replies {
                flex: none !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }

            /* 强制隐藏侧边栏，防止挤压 */
            #Rightbar, .v2p-sidebar {
                display: none !important;
            }

            /* 修复文字方向 */
            * {
                writing-mode: horizontal-tb !important;
            }
        }
    `;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.documentElement.appendChild(style);

    // 2. 针对旋转问题的动态修复：监听旋转事件并强制重置
    window.addEventListener('resize', () => {
        const main = document.querySelector('#Main, .v2p-main');
        if (main) {
            main.style.width = '100%';
            main.style.marginLeft = '0';
        }
    });

})();
