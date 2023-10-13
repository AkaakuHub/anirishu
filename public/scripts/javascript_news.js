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
    $("#modal").toggleClass("closed");
    $("#modal-overlay").toggleClass("closed");
    $(".modal_title").text(news_title);
    $(".modal_date").text(news_date);
    let news_main_text = $("#news_main").find("#" + id).html();
    console.log(news_main_text);
    $(".modal_text").html(news_main_text);
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
    $("#modal").toggleClass("closed");
    $("#modal-overlay").toggleClass("closed");
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