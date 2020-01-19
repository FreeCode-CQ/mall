/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 钟建坤
 * @Date: 2020-01-15 18:07:36
 * @LastEditors  : 钟建坤
 * @LastEditTime : 2020-01-15 18:11:07
 */

     var fun = function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;

            //这里是假设在640px宽度设计稿的情况下，1rem = 20px；
            //可以根据实际需要修改
            docEl.style.fontSize = 20 * (clientWidth / 760) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
fun(document, window);

