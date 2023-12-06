let isloading = true;

// ページが読み込まれたとき
document.addEventListener("DOMContentLoaded", function () {
    // JSdisabledをけす
    let JSdisabled = document.getElementById("JSdisabled");
    JSdisabled.remove();
    // ローディング画面を消す
    let loading = document.getElementById("loading");
    loading.classList.add("load_closed");
    isloading = false;
    // codeの構築
    buildCodeField();
});

function makeEmbed(id) {
    // idの中の記事の、すべてのaタグを探して、そのhrefの中身を抽出
    let news_main_elm = $("#news_main").find("#" + id);
    let links = news_main_elm.find("a");
    // linksの中身を配列にする
    let links_array = [];
    links.each(function () {
        links_array.push($(this).text());
    });
    // 空白を消す
    links_array = links_array.filter(function (e) { return e; });
    // localhost, anirishu.vercel.appを含むものを除外する
    links_array = links_array.filter(function (e) { return e.indexOf("localhost") == -1 && e.indexOf("anirishu.vercel.app") == -1; });
    // parentにlinksを配列として送る
    if (links_array.length == 0) return;
    parent.postMessage({ type: 'makeEmbed', links: links_array }, '*');
}

function buildCodeField() {
    // すべての<code>を探す
    let codes = document.querySelectorAll("code");
    codes.forEach(function (code) {
        // 新しい <pre> 要素を作成
        const preElement = document.createElement('pre');
        preElement.id = 'code_field';

        // 新しい <div> 要素を作成
        const codeFrame = document.createElement('div');
        codeFrame.classList.add('code_frame');

        // 新しいヘッダー部分を作成
        const copyHeader = document.createElement('div');
        copyHeader.classList.add('copy_header');
        copyHeader.innerHTML = `
        <button class='clipboard-icon_button closed' id='clipboard-icon_button'><a></a></button>
        <div class='clipboard-icon_text closed'>コピーしました!</div>
        `;
        // コードを追加
        // preElement.appendChild(code); これではなく、元の要素を削除せず複製せよ
        let code_clone = code.cloneNode(true);
        preElement.appendChild(code_clone);

        // コードテキスト部分を作成
        const codeText = document.createElement('div');
        codeText.classList.add('code_text');
        codeText.appendChild(preElement);

        // ヘッダーとコードテキストを codeFrame に追加
        codeFrame.appendChild(copyHeader);
        codeFrame.appendChild(codeText);

        // console.log(codeFrame.textContent);

        // codeがあった直後にcodeFrameを追加
        code.insertAdjacentElement("afterend", codeFrame);
        // もともとのcodeを削除
        code.remove();
    });
}

// newsボタン
$(".news_box").click(function () {
    let id = $(this).attr("id");
    let news_date = $(this).find(".news_date").text();
    let news_title = $(this).find(".news_title").text();
    showNews(id, news_date, news_title);
});


function showNews(id, date, title) {
    // eventもcloneする
    $("#modal").removeClass("closed_modal");
    $("#modal-overlay").removeClass("closed_modal");
    $(".modal_title").text(title);
    $(".modal_date").text(date);
    let news_main_text = $("#news_main").find("#" + id).html();
    $(".modal_text").html(news_main_text);
    // embedの構築(プロキシ)
    makeEmbed(id);
    // copyボタンを作成
    createCopyFunction();
    // 読了メータを表示
    createReadingMeter();
    // htmlに.no_scrollbarを追加
    $("html").addClass("no_scrollbar");
    // titleを更新
    parent.document.title = title + " | あにりしゅ";
    // idをクエリnidとして付与、更新
    parent.postMessage({ type: 'updateUrl', nid: id }, '*');
}

// modal閉じるボタン
$(".close-button").click(function () {
    $("#modal").addClass("closed_modal");
    $("#modal-overlay").addClass("closed_modal");
    // 読了メータのイベントを削除するため、要素ごと削除してから再構築
    let modal_field_news = document.querySelector(".modal_field_news");
    let clone = modal_field_news.cloneNode(true);
    modal_field_news.parentNode.replaceChild(clone, modal_field_news);
    // htmlから.no_scrollbarを追加
    $("html").removeClass("no_scrollbar");
    // titleを更新
    parent.document.title = "News | あにりしゅ";
    parent.postMessage({ type: "resetQuery" }, '*');
});

function createReadingMeter() {
    // 対象要素 class modal_field_news
    let target = document.querySelector(".modal_field_news");
    let pbar = document.querySelector(".progress-bar");
    let endHeight = target.scrollHeight - target.clientHeight;
    ReadingMeterUpdate();

    function ReadingMeterUpdate() {
        let read = target.scrollTop;
        let progress =  (read / endHeight * 100);
        if (read < 0) {
            progress = 0;
        } else if (read > endHeight) {
            progress = 100;
        }
        pbar.style.background = 'linear-gradient(to right, #9ba7ff 0% ' + progress + '%, #d9d9d9 ' + progress + '% 100%)';
        if (progress == 0) {
            pbar.classList.add("progress-bar_closed");
        } else {
            pbar.classList.remove("progress-bar_closed");
        }
    }

    target.addEventListener('scroll', function () {
        ReadingMeterUpdate();
    });
}

// // クエリを受け取るためのイベントハンドラを追加
window.addEventListener('message', function (event) {
    if (event.data.type === 'showNews') {
        // event.dataに送られてきたデータ
        let urlParams = event.data.urlParams;
        /* idをクエリからとる */
        let startIndex = urlParams.indexOf("nid=");
        if (startIndex != -1) {
            let newsid= urlParams.slice(startIndex + 4);
            let news_date = $("#" + newsid).find(".news_date").text();
            let news_title = $("#" + newsid).find(".news_title").text();
            showNews(newsid, news_date, news_title);
        }
    }
    if (event.data.type === 'ogp') {
        let ogp_data = event.data.ogp;
        let url = event.data.url;
        injectEmbed(ogp_data, url);
    }
});

function injectEmbed(ogp_data, url) {
    let og_title = ogp_data["og:title"];
    let og_image = ogp_data["og:image"];
    let og_description = ogp_data["og:description"];
    // urlに基づいてその真下にdivを作成
    // modalクラスの中のもののみを探す
    let a_tags = document.querySelectorAll(".modal_text a");
    let target_a = Array.from(a_tags).filter(function (a) {
        return a.text == url;
    })[0];

    // ここでdivを作成
    let div = document.createElement("div");
    div.classList.add("embed_frame");
    div.innerHTML = `
    <a href="${url}" target="_blank">
    <img src="${og_image}">
    <div class="embed_wrapper">
    <div class="embed_title">${og_title}</div>
    <div class="embed_url">${url}</div>
    <div class="embed_description">${og_description}</div>
    </div>
    </a>
    `;

    target_a.insertAdjacentElement("afterend", div);
    // aタグを削除
    target_a.remove();
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

var isShowing = false;

function createCopyFunction() {
    // pre > codeのすべてに要素を追加
    $(".clipboard-icon_button").click(function () {
        if (isShowing) return;
        let textarea = $(this).closest(".code_frame").find("code");
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textarea.text())
                .then(() => {
                    showCopyNotification($(this).closest(".code_frame").find(".clipboard-icon_text")[0])
                })
                .catch(err => console.error('コピーに失敗しました:', err));
        } else {
            let tempInput = $("<input>");
            $("body").append(tempInput);
            tempInput.val(textarea.text()).select();
            document.execCommand("copy");
            tempInput.remove();
            showCopyNotification($(this).closest(".code_frame").find(".clipboard-icon_text")[0]);
        }
    });

    // <div class="code_text">のすべてに、ホバーしたらさっきのアイコンを表示する
    let code_fields = document.querySelectorAll(".code_text");
    code_fields.forEach(function (code_field) {
        let clipboard_icon = $(code_field).closest(".code_frame").find(".clipboard-icon_button")[0];
        code_field.addEventListener("mouseover", function () {
            // code_field < div < div > div にある.clipboard-icon_buttonを選択
            clipboard_icon.classList.remove("closed");
        });
        code_field.addEventListener("mouseout", function () {
            if (isShowing) return;
            clipboard_icon.classList.add("closed");
        });
        clipboard_icon.addEventListener("mouseover", function () {
            clipboard_icon.classList.remove("closed");
        });
        clipboard_icon.addEventListener("mouseout", function () {
            if (isShowing) return;
            clipboard_icon.classList.add("closed");
        });
    });

    // その他の場所をクリックしてもアイコンを消す
    document.addEventListener("click", function (event) {
        if (isShowing) return;
        let clipboard_icons = document.querySelectorAll(".clipboard-icon_button");
        clipboard_icons.forEach(function (clipboard_icon) {
            // しかし、そこが.code_textの中だったら消さない
            if (event.target.closest(".code_text")) return;
            clipboard_icon.classList.add("closed");
        });
    });
}

function showCopyNotification(object) {
    isShowing = true;
    object.classList.remove("closed");
    setTimeout(function () {
        object.classList.add("closed");
        isShowing = false;
        // すべてのアイコンを消す
        let clipboard_icons = document.querySelectorAll(".clipboard-icon_button");
        clipboard_icons.forEach(function (clipboard_icon) {
            clipboard_icon.classList.add("closed");
        });
    }, 1000);
}