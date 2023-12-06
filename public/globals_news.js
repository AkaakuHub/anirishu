const jsInitCheckTimer = setInterval(jsLoaded, 1000);
function jsLoaded() {
    if (document.getElementById("iframe_main") != null) {
        clearInterval(jsInitCheckTimer);
        let iframe = document.getElementById("iframe_main");
        iframe.contentWindow.postMessage({ type: 'showNews', urlParams: window.location.search }, '*');
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
window.addEventListener('message', async function (event) {
    if (event.data.type === 'updateUrl') {
        let id = event.data.nid;
        updateQueryInParent(id);
    }
    if (event.data.type === "resetQuery") {
        resetQuery();
    }
    if (event.data.type === "makeEmbed") {
        // ここからlinks_arrayを使って、proxyでogpを取得
        let links_array = event.data.links;
        // url1つずつについて、proxyでogpを取得
        for (let url of links_array) {
            let ogp_data = await getOGP(url);
            let iframe = document.getElementById("iframe_main");
            iframe.contentWindow.postMessage({ type: "ogp", ogp: ogp_data, url: url }, '*');
        }
    }
});

async function getOGP(url) {
    const response = await fetch(`/api/proxy?url=${url}`);
    if (!response.ok) {
        return {};
    }
    const result = await response.text();
    const dom = new DOMParser().parseFromString(result, 'text/html');

    // ここからogpを取得
    // 今回はog:titleとog:image, og:descriptionを取得する
    let ogp_data = {};
    let og_title = dom.querySelector('meta[property="og:title"]');
    let og_image = dom.querySelector('meta[property="og:image"]');
    let og_description = dom.querySelector('meta[property="og:description"]');
    if (og_title != undefined && og_title) {
        ogp_data["og:title"] = og_title.content;
    } else {
        ogp_data["og:title"] = "タイトルが見つかりませんでした"
    }
    if (og_image != undefined && og_image) {
        ogp_data["og:image"] = og_image.content;
    } else {
        ogp_data["og:image"] = "../../../ogp404.png";
    }
    if (og_description != undefined && og_description) {
        ogp_data["og:description"] = og_description.content;
    } else {
        ogp_data["og:description"] = "説明が見つかりませんでした";
    }
    return ogp_data;
}

// URLを更新
function updateQueryInParent(id) {
    let parentUrl = new URL(window.location.href);
    parentUrl.searchParams.set("nid", id);
    history.replaceState(null, null, parentUrl);
}

// ページが読み込まれたときはクエリリセット
function resetQuery() {
    let parentUrl = new URL(window.location.href);
    parentUrl.searchParams.delete("nid");
    history.pushState(null, null, parentUrl);
}

// resetQuery();
