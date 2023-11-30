const jsInitCheckTimer = setInterval(jsLoaded, 100);
function jsLoaded() {
    if (document.getElementById("iframe_main") != null) {
        clearInterval(jsInitCheckTimer);
        let iframe = document.getElementById("iframe_main");
        iframe.contentWindow.postMessage(window.location.search, '*');
    }
}

/* 入力の部分のズーム対策 */
var ua = navigator.userAgent.toLowerCase();
var isiOS = (ua.indexOf('iphone') > -1) || (ua.indexOf('ipad') > -1);
if (isiOS) {
    var viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        var viewportContent = viewport.getAttribute('content');
        viewport.setAttribute('content', viewportContent + ', user-scalable=no');
    }
}