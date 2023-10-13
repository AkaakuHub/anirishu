const icon_da = '<svg width="32" height="32" viewBox="0, 0, 64, 64" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="64" height="64" rx="10" ry="10" fill="#eb5528" /><circle cx="28" cy="42" r="15" fill="#fff" /><circle cx="28" cy="42" r="10" fill="#eb5528" /><rect x="38" y="12" width="5" height="45" fill="#ffffff" /></svg>';
const icon_ab = '<svg width="32" height="32" viewBox="0, 0, 64, 64" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="64" height="64" rx="10" ry="10" fill="#000" /><rect x="17" y="30" width="30" height="5" fill="#ffffff" /><rect x="15" y="23.5" width="5" height="30" fill="#ffffff" /><rect x="44" y="23.5" width="5" height="30" fill="#ffffff" /><path d="M 15,24 a 17 17 -180 0 1 34,0" fill="#ffffff" /><path d="M 20,24 a 12 12 -180 0 1 24,0" fill="#000000" /><rect x="20" y="23.9" width="24" height="0.3" fill="#000000" /></svg>';
const icon_fo = '<svg width="32" height="32" viewBox="0, 0, 64, 64" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="64" height="64" rx="10" ry="10" fill="#000" /><rect x="17" y="10" width="8" height="44" fill="#d20023" /><rect x="20" y="10" width="26" height="8" fill="#d20023" /><rect x="20" y="27" width="24" height="8" fill="#d20023" /></svg>';
const icon_nh = '<svg width="32" height="32" viewBox="0, 0, 64, 64" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="64" height="64" rx="10" ry="10" fill="#000" /><rect x="1.5" y="1.5" width="61" height="61" rx="10" ry="10" fill="#cdecff" /><rect x="25" y="22" width="3" height="20" fill="#000000" transform="rotate(120, 32, 32)" /><rect x="25" y="22" width="3" height="20" fill="#000000" transform="rotate(-120, 32, 32)" /><rect x="25" y="22" width="3" height="20" fill="#000000" /><circle cx="26.3" cy="22.13" r="1.3" fill="#000000" /><circle cx="26.3" cy="41.87" r="1.3" fill="#000000" /><circle cx="43.4" cy="32" r="1.3" fill="#000000" /><rect x="0" y="12" width="64" height="3" fill="#000000" /><rect x="0" y="49" width="64" height="3" fill="#000000" /><rect x="10" y="0" width="3" height="12" fill="#000000" /><rect x="29" y="0" width="3" height="12" fill="#000000" /><rect x="48" y="0" width="3" height="12" fill="#000000" /><rect x="10" y="52" width="3" height="12" fill="#000000" /><rect x="29" y="52" width="3" height="12" fill="#000000" /><rect x="48" y="52" width="3" height="12" fill="#000000" /></svg>';
const icon_at = '<svg width="32" height="32" viewBox="0, 0, 64, 64" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="64" height="64" rx="10" ry="10" fill="#000" /><rect x="1.5" y="1.5" width="61" height="61" rx="10" ry="10" fill="#ffffff" /><g transform="translate(5,0)"><rect x="7" y="29.5" width="50" height="5" fill="#d1d1d1" transform="rotate(50,32,32)" /></g><g transform="translate(5,0)"><rect x="7" y="29.5" width="50" height="5" fill="#d1d1d1" transform="rotate(-50,32,32)" /></g><rect x="7" y="29.5" width="50" height="5" fill="#000000" transform="rotate(50,32,32)" /><rect x="34" y="29.5" width="25" height="5" fill="#b1242a" transform="rotate(50,32,32)" /><rect x="7" y="29.5" width="50" height="5" fill="#000000" transform="rotate(-50,32,32)" /><rect x="37" y="29.5" width="20" height="5" fill="#b1242a" transform="rotate(-50,32,32)" /><rect x="7" y="10" width="50" height="5" fill="#ffffff" /><rect x="7" y="49" width="50" height="6" fill="#ffffff" /></svg>';
const icon_az = '<svg width="32" height="32" viewBox="0, 0, 64, 64" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="64" height="64" rx="10" ry="10" fill="#1a98ff" /><circle cx="36" cy="20" r="10" fill="#000" /><circle cx="35" cy="20" r="7" fill="#1a98ff" /><rect x="24" y="10" width="4" height="30" fill="#000" /><path d="M 51,47 a 51 51 68 0 1 -33,2" fill="none" stroke="black" /><path d="M 51,47 a 37 37 60 0 1 -37,0" fill="none" stroke="black" /><path d="M 41,50 a 51 51 80 0 1 -14,1" fill="none" stroke="black" /><rect x="57" y="32" width="1.5" height="7" fill="#000" transform="rotate(30,32,32)" /><rect x="47" y="44" width="7" height="1.5" fill="#000" /><circle cx="54.12" cy="44.9" r="0.9" fill="#000" /></svg>';

const youbi = ["su", "mo", "tu", "we", "th", "fr", "sa"];
const jikan = 11;
const anime_table_startelm = document.getElementById("anime_table_start");
const result_table_startelm = document.getElementById("result_table_start");
const shared_table_startelm = document.getElementById("shared_table_start");
var anime_title_obj = {};
/* loading */
var isloading = true;
/* 追加削除切り替え */
var toggle_mode = "add";
/* 年度季節管理用 */
var nendo = getCurrentJapanTime().getFullYear().toString().slice(-2);
var season = getSeasonByMonth();

// クエリを受け取るためのイベントハンドラを追加
window.addEventListener('message', function (event) {
    // event.dataに送られてきたデータが含まれています
    let urlParams = event.data;
    /* aidをクエリからとる */
    let startIndex = urlParams.indexOf("aid=");
    if (startIndex != -1) {
        let aidValue = urlParams.slice(startIndex + 4);
        createSharedTable(aidValue);
    }
});


/* ページが読み込まれたとき */
document.addEventListener("DOMContentLoaded", function () {
    /* JSdisabledをけす */
    let JSdisabled = document.getElementById("JSdisabled");
    JSdisabled.remove();
    /* 初めに自動的に季節を選択 */
    let target = document.getElementById(season);
    target.classList.remove("select_season_not_selected");
    target.classList.add("select_season_selected");
    loadJSON()
        .then(anime_title_obj => {
            buildHTML(anime_title_obj);
        });
});
/* JSONを読み込む */
function loadJSON() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', "../data/anime_title_obj.json");
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

function buildHTML(anime_title_obj) {
    /* マス関係 */
    /* 11行目はその他の時間 */
    var insert_table = '';
    for (let i = 1; i <= jikan; i++) {
        let time_hyouji_s = "";
        if (i % 2 != 0) {
            time_hyouji_s = (Math.ceil(i / 2) + 20) + ":00";
        }
        else {
            time_hyouji_s = (Math.ceil(i / 2) + 20) + ":30";
        }
        if (i == 11) {
            time_hyouji_s = "その他";
        }
        insert_table += `<tr><td align="center" class="table_label_y"><table border="0" cellspacing="0" cellpadding="2"><tbody><tr><td align="center" class="table_label_y">${time_hyouji_s}</td></tr></tbody></table></td>`;
        for (let j = 0; j < youbi.length; j++) {
            insert_table += `<td class="grid_td"><table cellspacing="0" cellpadding="2" class="grid_table"><tbody><tr id="${youbi[j]}${i}"></tr></tbody></table></td>`;
        }
        insert_table += '</tr>';
    }
    let result_insert_table = insert_table.replaceAll("grid_td", "grid_td_result").replaceAll("grid_table", "grid_table_result").replaceAll('id="', 'id="ur_');
    let shared_insert_table = result_insert_table.replaceAll("grid_td_result", "grid_td_shared").replaceAll("grid_table_result", "grid_table_shared").replaceAll('id="ur_', 'id="shared_');
    anime_table_startelm.insertAdjacentHTML('beforeend', insert_table);
    result_table_startelm.insertAdjacentHTML('beforeend', result_insert_table);
    shared_table_startelm.insertAdjacentHTML('beforeend', shared_insert_table);
    /* テーブルを更新する */
    refresh_table(anime_title_obj, jikan, youbi);
    /* 季節ボタンをクリックしたときの処理 */
    let cells = document.querySelectorAll('.select_season');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    /* tweetbuttonの表示切替リスナー */
    let tweetbutton = document.getElementById("TweetButton");
    let toTOPbutton = document.getElementById("TopButton");
    let buttonvisible = document.getElementById("ButtonVisible");
    let toggle_button = document.getElementsByClassName("toggle_button")[0];
    buttonvisible.addEventListener('click', handleTweetButtonClick);
    function handleTweetButtonClick() {
        if (tweetbutton.style.display === "none") {
            tweetbutton.style.display = "block";
            toTOPbutton.style.right = "30px";
            buttonvisible.innerHTML = "ボタンを消す";
            toggle_button.style.display = "block";
        } else {
            tweetbutton.style.display = "none";
            toTOPbutton.style.right = "-9999px";
            buttonvisible.innerHTML = "ボタンを表示";
            toggle_button.style.display = "none";
        }
    }
    /* トグルのリセット */
    let toggleCheckbox = document.getElementById('toggle');
    toggleCheckbox.checked = false;
    /* 検索ボックスのリセット */
    let searchBox = document.getElementById("sbox");
    searchBox.value = "";
    /* フォーム無効化 */
    let form = document.getElementById("form1");
    function disableFormSubmit(event) {
        event.preventDefault();
    }
    form.addEventListener("submit", disableFormSubmit);
    /* 凡例のインジェクション */
    let hanrei = document.getElementById("hanrei");
    let temp_txt = `<div>${icon_da}:dアニメ</div>`;
    temp_txt += `<div>${icon_at}:AT-X</div>`;
    temp_txt += `<div>${icon_ab}:AbemaTV</div>`;
    temp_txt += `<div>${icon_az}:Amazonプライム</div>`;
    temp_txt += `<div>${icon_fo}:FOD</div>`;
    temp_txt += `<div>${icon_nh}:その他配信</div>`;
    hanrei.innerHTML += temp_txt;

    /* 最後に、loadingを消す */
    let loading = document.getElementById("loading");
    loading.classList.add("load_closed");
    isloading = false;
}

/* 季節が変わったときもここ */
function refresh_table(anime_title_obj, jikan, youbi) {
    let this_anime_list = anime_title_obj[nendo + season];
    let keys = Object.keys(this_anime_list);
    /* ur_animeを初期化する2(季節変えたときよう) */
    for (let i = 1; i <= jikan; i++) {
        for (let j = 0; j < youbi.length; j++) {
            let elm = document.getElementById("ur_" + youbi[j] + i)
            elm.innerHTML = "";
        }
    }
    for (let i = 1; i <= jikan; i++) {
        for (let j = 0; j < youbi.length; j++) {
            /* listを削除してから生成 */
            let list_startelm = document.getElementById(youbi[j] + i);
            list_startelm.innerHTML = `<td class="anime_dropdown"><select id=${youbi[j] + i + "_list"} ><option value="" selected></option></select><td>`;
            /* list_startelm.insertAdjacentHTML('beforeend', `<select id=${youbi[j] + i + "_list"}><option value="" selected></option></select>`); */
            /* listにoptionを追加 */
            let list = document.getElementById(youbi[j] + i + "_list");
            for (let k = 0; k < keys.length; k++) {
                let key = keys[k];
                if (this_anime_list[key]["koma"] == (youbi[j] + i)) {
                    /* let c = getCookie(nendo + season + "_" + youbi[j] + i); */
                    /* if(c.includes(this_anime_list[key]["aid"])) continue; */
                    let option = document.createElement("option");
                    option.value = this_anime_list[key]["aid"];
                    option.text = key;
                    list.appendChild(option);
                }
            }
            list.value = "";
            /* イベントハンドラ関数 */
            function handleListChange() {
                let selectedValue = list.value;
                if (selectedValue == "") return;
                /* 複数アニメにも対応にも対応 */
                /* 更新されたときur_animeを更新する */
                let cookie_data = getCookie(nendo + season + "_" + youbi[j] + i);
                if (cookie_data == null) cookie_data = "";
                /* ここら辺、追加/削除で分ける */
                let elm = document.getElementById("ur_" + youbi[j] + i)
                let key = list.options[list.selectedIndex].text;
                if (toggle_mode == "add") {
                    if (!cookie_data.includes(selectedValue)) {
                        cookie_data += selectedValue;
                    }
                    if (!elm.innerHTML.includes(this_anime_list[key]["aid"])) {
                        let txt = convert2svg(this_anime_list, key);
                        elm.innerHTML += `<a href="${this_anime_list[key]["url"]}" class="ur_a" id="${this_anime_list[key]["aid"]}" target="_blank">${txt}</a><br>`
                    }
                } else if (toggle_mode == "remove") {
                    cookie_data = cookie_data.replace(selectedValue, "");
                    let regex = new RegExp(`<a[^>]*id="${this_anime_list[key]["aid"]}"[^>]*>.*?</a><br>`, "g");
                    elm.innerHTML = elm.innerHTML.replace(regex, "");
                }
                setCookie(nendo + season + "_" + youbi[j] + i, cookie_data);
                /* 記録したら空白にする */
                list.value = "";
            }
            /* イベントリスナーを追加して変更を監視 */
            list.addEventListener("change", handleListChange);
            let cookie_data = getCookie(nendo + season + "_" + youbi[j] + i);
            /* ur_animeを更新する(もしcookieにデータがあれば) */
            if (cookie_data) {
                let elm = document.getElementById("ur_" + youbi[j] + i)
                let cookie_list = [];
                for (let i = 0; i < cookie_data.length / 8; i++) {
                    cookie_list.push(cookie_data.slice(i * 8, (i + 1) * 8));
                }
                for (let k = 0; k < cookie_list.length; k++) {
                    let cookie = cookie_list[k];
                    for (let l = 0; l < keys.length; l++) {
                        let key = keys[l];
                        let txt = convert2svg(this_anime_list, key);
                        if (this_anime_list[key]["aid"] == cookie) {
                            elm.innerHTML += `<a href="${this_anime_list[key]["url"]}" class="ur_a" id="${this_anime_list[key]["aid"]}" target="_blank">${txt}</a><br>`
                        }
                    }
                }
            }
        }
    }
    /* フォーム無効化 */
    let form = document.getElementById("form1");
    /* 毎回フォームオブジェクトごとリセット */
    form.innerHTML = '<input id="sbox" id="s" name="s" type="text" placeholder="タイトル・キーワードを入力" />';
    /* 検索ボックスの構築 */
    let searchBox = document.getElementById("sbox");
    searchBox.value = "";
    searchBox.addEventListener('input', handleSearchBoxInput);
    searchBox.addEventListener('focus', handleSearchBoxInput);
    /* searchBox.addEventListener('blur', handleSearchBoxInput2); */
    function handleSearchBoxInput() {
        let search_container = document.getElementById("search_container");
        let box = document.getElementById("search_result_box");
        let searchQuery = document.getElementById("sbox").value;
        /* keywordもok */
        let matchingData = keys.filter(function (key) {
            return key.includes(searchQuery) || this_anime_list[key]["kw"].includes(searchQuery);
        });
        /* 重複を取り除く */
        matchingData = Array.from(new Set(matchingData));
        search_container.innerHTML = "";
        if (matchingData.length > 0 && searchQuery != "") {
            for (let i = 0; i < matchingData.length; i++) {
                let key = matchingData[i];
                let txt = convert2svg(this_anime_list, key);
                let aid = this_anime_list[key]["aid"];
                let card = `<div class="card" id="${aid}_card"><div class="row"><p>${txt}</p></div></div>`;
                search_container.insertAdjacentHTML("beforeend", card);
                let cardelm = document.getElementById(aid + "_card");
                cardelm.addEventListener('click', handleCardClick);
            }
            box.classList.add("active");
        } else {
            box.classList.remove("active");
        }
    }
    function handleCardClick() {
        let aid = this.getAttribute('id').split("_")[0];
        let key = Object.keys(this_anime_list).find(key => this_anime_list[key]["aid"] === aid);
        let nendo = aid.slice(0, 2);
        let season;
        switch (aid.slice(2, 3)) {
            case "1":
                season = "fuyu";
                break;
            case "2":
                season = "haru";
                break;
            case "3":
                season = "natu";
                break;
            case "4":
                season = "aki";
                break;
        };
        let koma = this_anime_list[key]["koma"];
        let elm = document.getElementById("ur_" + koma)
        let cookie_data = getCookie(nendo + season + "_" + koma);
        if (cookie_data == null) cookie_data = "";
        if (toggle_mode == "add") {
            if (!cookie_data.includes(aid)) {
                cookie_data += aid;
            }
            if (!elm.innerHTML.includes(this_anime_list[key]["aid"])) {
                let txt = convert2svg(this_anime_list, key);
                elm.innerHTML += `<a href="${this_anime_list[key]["url"]}" class="ur_a" id="${this_anime_list[key]["aid"]}" target="_blank">${txt}</a><br>`
            }
        } else if (toggle_mode == "remove") {
            cookie_data = cookie_data.replace(aid, "");
            let regex = new RegExp(`<a[^>]*id="${this_anime_list[key]["aid"]}"[^>]*>.*?</a><br>`, "g");
            elm.innerHTML = elm.innerHTML.replace(regex, "");
        }
        setCookie(nendo + season + "_" + koma, cookie_data);
        let search_container = document.getElementById("search_container");
        search_container.innerHTML = "";
        let box = document.getElementById("search_result_box");
        box.classList.remove("active");
    }
}
/* queryから共有されたテーブルを作成 */
function createSharedTable(aidValue) {
    let modal = document.getElementById("modal");
    let modal_overlay = document.getElementById("modal-overlay");
    modal.classList.remove("closed");
    modal_overlay.classList.remove("closed");

    /* dataを並べる */
    let data = [];
    let nendo = aidValue.slice(0, 2);
    let season;
    switch (aidValue.slice(2, 3)) {
        case "1":
            season = "fuyu";
            break;
        case "2":
            season = "haru";
            break;
        case "3":
            season = "natu";
            break;
        case "4":
            season = "aki";
            break;
    };
    let season_num = aidValue.slice(2, 3);
    for (let i = 0; i < (aidValue.length - 3) / 5; i++) {
        data.push(aidValue.slice(3, aidValue.length).slice(i * 5, (i + 1) * 5));
    }
    if ((aidValue.length - 3) % 5 != 0) {
        alert("クエリパラメータが不正です。");
        return;
    }
    /* テーブルを作成 */
    let shared_this_anime_list = anime_title_obj[nendo + season];
    for (let i = 0; i < data.length; i++) {
        let aid = nendo + season_num + data[i];
        let key = Object.keys(shared_this_anime_list).find(key => shared_this_anime_list[key] && shared_this_anime_list[key]["aid"] === aid);
        let koma = shared_this_anime_list[key]["koma"];
        let elm = document.getElementById("shared_" + koma)
        let cookie_data = getCookie(nendo + season + "_" + koma);
        if (cookie_data == null) cookie_data = "";
        let txt = convert2svg(shared_this_anime_list, key);
        elm.innerHTML += `<a href="${shared_this_anime_list[key]["url"]}" class="ur_a" id="${shared_this_anime_list[key]["aid"]}" target="_blank">${txt}</a><br>`
    }
}



/* svgに変換 */
function convert2svg(this_anime_list, key) {
    let txt = key;
    if (this_anime_list[key]["aid"].includes("fo")) {
        txt += icon_fo;
        txt = txt.replaceAll("(FOD)", "");
    }
    if (this_anime_list[key]["aid"].includes("da")) {
        txt += icon_da;
        txt = txt.replaceAll("(dアニメ)", "");
    }
    if (this_anime_list[key]["aid"].includes("ab")) {
        txt += icon_ab;
        txt = txt.replaceAll("(Abema)", "");
    }
    if (this_anime_list[key]["aid"].includes("nh")) {
        txt += icon_nh;
        txt = txt.replaceAll("(配信)", "");
    }
    if (this_anime_list[key]["aid"].includes("at")) {
        txt += icon_at;
        txt = txt.replaceAll("(AT-X)", "");
    }
    if (this_anime_list[key]["aid"].includes("az")) {
        txt += icon_az;
        txt = txt.replaceAll("(Amazon)", "");
    }
    /* 更に、開始時間も追加 */
    let starttime = this_anime_list[key]["time"];
    txt += `<span class="starttime">(${starttime})</span>`;
    return txt;
}


function setCookie(key, value) {
    document.cookie = key + "=" + encodeURIComponent(value) + "; SameSite=Strict; ";
}

function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
        }
    }
    return null;
}
/* 季節きりかえ */
function handleCellClick(event) {
    let clickedCell = event.currentTarget;
    let kind = clickedCell.getAttribute('id');
    /* すべてのセルから選択状態を解除 */
    let cells = document.querySelectorAll('.select_season');
    cells.forEach(cell => {
        cell.classList.remove("select_season_selected");
        cell.classList.add("select_season_not_selected");
    });
    /* クリックされたセルを選択状態に変更 */
    clickedCell.classList.remove("select_season_not_selected");
    clickedCell.classList.add("select_season_selected");
    /* タイトルを設定 */
    let fuyu = document.getElementById("fuyu");
    let haru = document.getElementById("haru");
    let natu = document.getElementById("natu");
    let aki = document.getElementById("aki");
    fuyu.title = (kind === "fuyu") ? "冬アニメを表示しています。" : "冬アニメを表示します。";
    haru.title = (kind === "haru") ? "春アニメを表示しています。" : "春アニメを表示します。";
    natu.title = (kind === "natu") ? "夏アニメを表示しています。" : "夏アニメを表示します。";
    aki.title = (kind === "aki") ? "秋アニメを表示しています。" : "秋アニメを表示します。";
    refresh_table(anime_title_obj, jikan, youbi, kind, getCurrentJapanTime().getFullYear().toString().slice(-2));
}

/* 日本時間を取得する関数 */
function getCurrentJapanTime() {
    let now = new Date();
    let japanTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
    return japanTime;
}
/* 現在の月を取得 */
function getCurrentMonth() {
    let japanTime = getCurrentJapanTime();
    return japanTime.getMonth() + 1; /* 月は0から始まるため+1する */
}
/* 季節を選択する関数 */
function getSeasonByMonth() {
    let currentMonth = getCurrentMonth();
    let selectedSeason = "fuyu"; /* デフォルトは冬 */
    /* 月に応じて季節を設定 */
    if (currentMonth >= 4 && currentMonth <= 6) {
        selectedSeason = "haru"; /* 4-6月は春 */
    } else if (currentMonth >= 7 && currentMonth <= 9) {
        selectedSeason = "natu"; /* 7-9月は夏 */
    } else if (currentMonth >= 10 && currentMonth <= 12) {
        selectedSeason = "aki"; /* 10-12月は秋 */
    }
    return selectedSeason
}

/* アニメテーブルを表示切替 */
$("#AnimeTableVisible").click(function () {
    /* classにactiveがないとき */
    if ($(this).attr("class") !== "active") {
        $("#anime_table").toggleClass("active");
        $(this).toggleClass("active");
    } else {
        $("#anime_table").removeClass("active");
        $(this).removeClass("active");
    }
});

/* 追加削除のトグル */
$(".toggle_button").click(function () {
    /* toggleのactiveないとき */
    if ($("#toggle_moji").attr("class") !== "inactive") {
        $(".anime_dropdown > select").toggleClass("red");
        $("#search_result_box").toggleClass("red");
        $("#toggle_moji").toggleClass("inactive");
        $("#toggle_moji").html("削除");
        toggle_mode = "remove";
    } else {
        /* addへ */
        $(".anime_dropdown > select").removeClass("red");
        $("#search_result_box").removeClass("red");
        $("#toggle_moji").removeClass("inactive");
        $("#toggle_moji").html("追加");
        toggle_mode = "add";
    }
});

/* ハンバーガーメニュー */
$(".openbtn").click(function () {
    $(this).toggleClass('active');
    $("#g-nav").toggleClass('panelactive');
});

$("#g-nav a").click(function () {
    $(".openbtn").removeClass('active');
    $("#g-nav").removeClass('panelactive');
});


/* topボタン */
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

/* 最初のポップアップ */
$(".close-button").click(function () {
    $("#modal").toggleClass("closed");
    $("#modal-overlay").toggleClass("closed");
    /* cookieに記録 => 結果表示に再利用 */
    /* setCookie("visited", "true"); */
});

/* tweetbutton */
$("#TweetButton").click(function () {
    let isFirst = true;
    let tweetText = "";
    for (let i = 1; i <= jikan; i++) {
        for (let j = 0; j < youbi.length; j++) {
            let c = getCookie(nendo + season + "_" + youbi[j] + i);
            if (c) {
                if (isFirst) {
                    tweetText += c;
                    isFirst = false;
                } else {
                    tweetText += c.slice(3, 8);
                }
            }
        }
    }
    let mongon = "私が見るアニメはこれだ！\n";
    let tweetURL = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(mongon) + "&url=https://anirishu.vercel.app/" + encodeURIComponent(tweetText) + "&hashtags=あにりしゅ";
    window.open(tweetURL, "_blank");
});

$(function () {
    /* モーダル領域をクリックでフェードアウトさせる */
    $('.text').click(function () {
        let search_container = document.getElementById("search_container");
        let box = document.getElementById("search_result_box");
        search_container.innerHTML = "";
        box.classList.remove("active");
    });
    /* がしかし、画像をクリックでキャンセルさせる */
    $('#search_result_box').on('click', function (e) {
        e.stopPropagation();
    });
    /* form1もキャンセル */
    $('#form1').on('click', function (e) {
        e.stopPropagation();
    });
});

// dom読み込んだときはactiveをとる


$("#news_onClick").click(function () {
    $(".iframe_container").removeClass("closed");
    $("#tomain").removeClass("closed");
});

$("#tomain").click(function () {
    $(".iframe_container").addClass("closed");
    $("#tomain").addClass("closed");
});

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