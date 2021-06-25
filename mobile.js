/*
 * @Description:
 * @Version:
 * @Autor: zjf
 * @Date: 2021-01-31 11:09:06
 * @LastEditors: zjf
 * @LastEditTime: 2021-01-31 11:30:51
 */


 //移动端适配
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            var fontSize = 20;
            docEl.style.fontSize = fontSize + 'px';
            var docStyles = getComputedStyle(docEl);
            var realFontSize = parseFloat(docStyles.fontSize);
            var scale = realFontSize / fontSize;
            // console.log("realFontSize: " + realFontSize + ", scale: " + scale);
            fontSize = clientWidth / 667 * 20;
            if(isIphoneX()) fontSize = 19;
            fontSize = fontSize / scale;
            docEl.style.fontSize = fontSize + 'px';
        };
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

    // iphoneX判断
    function isIphoneX(){
        return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    }

})(document, window);