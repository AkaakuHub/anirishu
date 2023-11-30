var isloading = true;
// ページが読み込まれたとき
document.addEventListener("DOMContentLoaded", function () {
    // JSdisabledをけす
    let JSdisabled = document.getElementById("JSdisabled");
    JSdisabled.remove();
    // ローディング画面を消す
    let loading = document.getElementById("loading");
    loading.classList.add("load_closed");
    isloading = false;
});

// newsボタン
$(".news_box").click(function () {
    let id = $(this).attr("id");
    let news_date = $(this).find(".news_date").text();
    let news_title = $(this).find(".news_title").text();
    showNews(id, news_date, news_title);
});

function showNews(id, date, title) {
    $("#modal").removeClass("closed_modal");
    $("#modal-overlay").removeClass("closed_modal");
    $(".modal_title").text(title);
    $(".modal_date").text(date);
    let news_main_text = $("#news_main").find("#" + id).html();
    $(".modal_text").html(news_main_text);
    // idをクエリとして付与、更新
    parent.postMessage({ type: 'updateUrl', id: id }, '*');
}

// クエリを受け取るためのイベントハンドラを追加
window.addEventListener('message', function (event) {
    // event.dataに送られてきたデータ
    let urlParams = event.data;
    /* idをクエリからとる */
    let startIndex = urlParams.indexOf("id=");
    if (startIndex != -1) {
        let newsid= urlParams.slice(startIndex + 3);
        let news_date = $("#" + newsid).find(".news_date").text();
        let news_title = $("#" + newsid).find(".news_title").text();
        showNews(newsid, news_date, news_title);
    }
});

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

// modal閉じるボタン
$(".close-button").click(function () {
    $("#modal").addClass("closed_modal");
    $("#modal-overlay").addClass("closed_modal");
    parent.postMessage({ type: "resetQuery" }, '*');
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