//识别各种浏览器及平台
//检测是否为PC端浏览器模式


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

//判断obj是否为Dom对象

//storage

/* 常用的设备检测方式
跨端事件处理
js移动端适配方案 */

//判断是否支持webp图片格式
const canUseWebp = () => (document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0)

// 10、isNative：判断 value 是不是浏览器内置函数

// 内置函数toString后的主体代码块为 [native code] ，而非内置函数则为相关代码，所以非内置函数可以进行拷贝(toString后掐头去尾再由Function转)

function isNative(value) {
    return typeof value === 'function' && /native code/.test(value.toString())
}


// 32、downloadFile：base64数据导出文件，文件下载

function downloadFile(filename, data){
    let DownloadLink = document.createElement('a');

    if ( DownloadLink ){
        document.body.appendChild(DownloadLink);
        DownloadLink.style = 'display: none';
        DownloadLink.download = filename;
        DownloadLink.href = data;

        if ( document.createEvent ){
            let DownloadEvt = document.createEvent('MouseEvents');

            DownloadEvt.initEvent('click', true, false);
            DownloadLink.dispatchEvent(DownloadEvt);
        }
        else if ( document.createEventObject )
            DownloadLink.fireEvent('onclick');
        else if (typeof DownloadLink.onclick == 'function' )
            DownloadLink.onclick();

        document.body.removeChild(DownloadLink);
    }
}

// 33、toFullScreen：全屏

function toFullScreen(){
    let elem = document.body;
    elem.webkitRequestFullScreen
    ? elem.webkitRequestFullScreen()
    : elem.mozRequestFullScreen
    ? elem.mozRequestFullScreen()
    : elem.msRequestFullscreen
    ? elem.msRequestFullscreen()
    : elem.requestFullScreen
    ? elem.requestFullScreen()
    : alert("浏览器不支持全屏");
}

// 34、exitFullscreen：退出全屏

function exitFullscreen(){
    let elem = parent.document;
    elem.webkitCancelFullScreen
    ? elem.webkitCancelFullScreen()
    : elem.mozCancelFullScreen
    ? elem.mozCancelFullScreen()
    : elem.cancelFullScreen
    ? elem.cancelFullScreen()
    : elem.msExitFullscreen
    ? elem.msExitFullscreen()
    : elem.exitFullscreen
    ? elem.exitFullscreen()
    : alert("切换失败,可尝试Esc退出");
}

// 35、requestAnimationFrame：window动画

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
        //为了使setTimteout的尽可能的接近每秒60帧的效果
        window.setTimeout(callback, 1000 / 60);
    };

window.cancelAnimationFrame = window.cancelAnimationFrame ||
    Window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function (id) {
        //为了使setTimteout的尽可能的接近每秒60帧的效果
        window.clearTimeout(id);
    }