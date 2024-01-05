let isloading = true;
var anime_title_obj = {};

// ページが読み込まれたとき
document.addEventListener("DOMContentLoaded", function () {
    // JSdisabledをけす
    let JSdisabled = document.getElementById("JSdisabled");
    JSdisabled.remove();
    // ローディング画面を消す
    let loading = document.getElementById("loading");
    loading.classList.add("load_closed");
    isloading = false;
    loadJSON()
        .then((anime_title_obj) => {
            // anime_title_objの重複を取り除く
        });
});

// JSONを読み込む
function loadJSON() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', "../../data/anime_title_obj.json");
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            if (request.status === 200) {
                anime_title_obj = request.response;
                anime_title_obj = JSON.parse(JSON.stringify(anime_title_obj));
                resolve(anime_title_obj);
            } else {
                reject('Failed to load data:' + request.status);
            }
        };
    });
}

// topボタン
$(function () {
    var pagetop = $('#TopButton');
    pagetop.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            pagetop.fadeIn();
        } else {
            pagetop.fadeOut();
        }
    });
    pagetop.click(function () {
        $('body, html').animate({ scrollTop: 0 }, 600);
        return false;
    });
});

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

/* tweetbutton */
$("#TweetButton").click(function () {
    // windowのtitleを取得
    let mongon = parent.document.title;
    // 現在の、modalのidを取得
    let tweetText = "";
    let tweetURL = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(mongon) + "&url=https://anirishu.vercel.app/nid/" + encodeURIComponent(tweetText) + "&hashtags=あにりしゅ";
    window.open(tweetURL, "_blank");
});