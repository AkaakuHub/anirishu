const jsInitCheckTimer = setInterval(jsLoaded, 100);
function jsLoaded() {
    if (document.getElementById("iframe_main") != null) {
        clearInterval(jsInitCheckTimer);
        let iframe = document.getElementById("iframe_main");
        iframe.contentWindow.postMessage(window.location.search, '*');
    }
}

// 入力の部分のズーム対策
var ua = navigator.userAgent.toLowerCase();
var isiOS = (ua.indexOf('iphone') > -1) || (ua.indexOf('ipad') > -1);
if (isiOS) {
    var viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        var viewportContent = viewport.getAttribute('content');
        viewport.setAttribute('content', viewportContent + ', user-scalable=no');
    }
}


// メッセージ受信
window.addEventListener('message', function (event) {
    if (event.data.type === 'updateUrl') {
        let id = event.data.id;
        updateQueryInParent(id);
    }
    if (event.data.type === "resetQuery") {
        resetQuery();
    }
});

// URLを更新
function updateQueryInParent(id) {
    let parentUrl = new URL(window.location.href);
    parentUrl.searchParams.set("id", id);
    history.replaceState(null, null, parentUrl);
}

// ページが読み込まれたときはクエリリセット
function resetQuery() {
    let parentUrl = new URL(window.location.href);
    parentUrl.searchParams.delete("id");
    history.pushState(null, null, parentUrl);
}

// resetQuery();
