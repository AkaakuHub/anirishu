import { ImageResponse, NextRequest } from "next/server";
import * as fs from 'fs';
import { loadGoogleFont } from '@/lib/font';
import Anime_title_obj from '../../../public/data/anime_title_obj.json';
import Newslist from '../../../public/data/newslist.json';

const anime_title_obj: { [key: string]: any } = Anime_title_obj;
const newslist: { [key: string]: any } = Newslist;

export const config = {
    runtime: "edge",
};

// query場合分け
export default async function handler(req: NextRequest) {
    const fontArrayBuffer = await loadGoogleFont({
        family: 'M PLUS Rounded 1c',
        weight: 500,
    });
    try {
        const failureImg = new ImageResponse(
            (
                <div
                    style={{
                        background: "linear-gradient(to left top, #fff8d4, #ffbbbb)",
                        backgroundSize: "100% 100%",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative"
                    }}
                >
                    {
                        <div
                            style={{
                                // 上下、左右の余白を50pxにする
                                width: `${1200 - 2 * 50}px`,
                                height: `${630 - 2 * 50}px`,
                                backgroundColor: "#ffffff",
                                display: "flex",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "absolute",
                                borderRadius: "50px",
                                // 中央ぞろえ
                                left: "50px",
                                top: "50px",
                                // shadowをつける
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    fontSize: 70,
                                    fontStyle: "normal",
                                    fontWeight: "bold",
                                    color: "#000",
                                    padding: "0 120px",
                                    lineHeight: 1.3,
                                    marginBottom: "30px",
                                    // wordWrap: "break-word",
                                    whiteSpace: "nowrap",
                                    position: "absolute",
                                    left: "0%",
                                    top: "30%",
                                }}
                            >
                                あにりしゅ！
                            </div>
                            <div
                                style={{
                                    width: "100%",
                                    fontSize: 40,
                                    fontStyle: "normal",
                                    fontWeight: "bold",
                                    color: "#000",
                                    padding: "0 120px",
                                    lineHeight: 1.3,
                                    whiteSpace: "nowrap",
                                    position: "absolute",
                                    left: "0%",
                                    top: "60%",
                                }}
                            >
                                アニメの履修登録ができるサイト
                            </div>
                        </div>
                    }
                    {
                        // iconを表示、右下に配置
                        <img src="https://raw.githubusercontent.com/AkaakuHub/anirishu/main/public/favicons/android-chrome-256x256.png" style={{
                            position: "absolute",
                            width: "100px",
                            height: "100px",
                            bottom: "100px",
                            right: "100px",
                        }} />
                    }
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'MPLUSRounded1c',
                        data: fontArrayBuffer,
                        style: 'normal',
                        weight: 500,
                    },
                ]
            }
        );
        const { searchParams } = new URL(req.url);
        // aid または nidで場合分け
        const hasTitle = searchParams.has("aid");
        const aidValue = hasTitle
            ? searchParams.get("aid")?.toString()
            : null;
        const hasTitle2 = searchParams.has("nid");
        const nidValue = hasTitle2
            ? searchParams.get("nid")?.toString()
            : null;
        if (nidValue) {//正常なら
            if (nidValue.length == 9) {// 正常なら9
                let nid = nidValue;
                let news_title = newslist[nid] ? newslist[nid] : "";
                if (news_title != "") {
                    let news_date = nid.slice(0, 4) + "/" + nid.slice(4, 6) + "/" + nid.slice(6, 8);
                    return new ImageResponse(
                        (
                            <div
                                style={{
                                    background: "linear-gradient(to left top, #fff8d4, #ffbbbb)",
                                    backgroundSize: "100% 100%",
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    textAlign: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // flexDirection: "column",
                                    // flexWrap: "nowrap",
                                    position: "relative"
                                }}
                            >
                                {
                                    <div
                                        style={{
                                            // 上下、左右の余白を50pxにする
                                            width: `${1200 - 2 * 50}px`,
                                            height: `${630 - 2 * 50}px`,
                                            backgroundColor: "#ffffff",
                                            display: "flex",
                                            textAlign: "center",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "absolute",
                                            borderRadius: "50px",
                                            // 中央ぞろえ
                                            left: "50px",
                                            top: "50px",
                                            // shadowをつける
                                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                                        }}
                                    >
                                        {
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    fontSize: 45,
                                                    fontStyle: "normal",
                                                    fontWeight: "bold",
                                                    color: "#000",
                                                    padding: "5px 5px",
                                                    lineHeight: 1,
                                                    marginBottom: "30px",
                                                    wordWrap: "break-word",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    left: "50%",
                                                    top: "50%",
                                                    transform: "translate(-50%, -50%)",
                                                    whiteSpace: "pre-line",
                                                }}
                                            >
                                                {`${news_title}\n${news_date}`}
                                            </div>
                                        }
                                    </div>
                                }
                                {
                                    // iconを表示、右下に配置
                                    <img src="https://raw.githubusercontent.com/AkaakuHub/anirishu/main/public/favicons/android-chrome-256x256.png" style={{
                                        position: "absolute",
                                        width: "100px",
                                        height: "100px",
                                        bottom: "100px",
                                        right: "100px",
                                    }} />
                                }
                            </div>
                        ),
                        {
                            width: 1200,
                            height: 630,
                            fonts: [
                                {
                                    name: 'MPLUSRounded1c',
                                    data: fontArrayBuffer,
                                    style: 'normal',
                                    weight: 500,
                                },
                            ]
                        }
                    );
                } else {
                    return failureImg;
                }
            } else {//クエリ異常
                return failureImg;
            }
        }
        if (aidValue) {//正常なら
            if ((aidValue.length - 3) % 5 == 0) {// 正常なら２
                let data = [];
                let nendo: string = aidValue.slice(0, 2);
                let season: string = "";
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
                let shared_this_anime_title = anime_title_obj[nendo + season];
                let anime_title = [];
                for (let i = 0; i < data.length; i++) {
                    let aid = nendo + season_num + data[i];
                    let key: string = Object.keys(shared_this_anime_title).find(key => shared_this_anime_title[key] && shared_this_anime_title[key]["aid"] === aid) || "";
                    anime_title.push(key);
                }
                if (anime_title.length > 9) {//10以上だとetcを表示
                    anime_title = anime_title.slice(0, 9);
                    anime_title.push("etc...(完全版はWebで確認！！)");
                }
                return new ImageResponse(
                    (
                        <div
                            style={{
                                background: "linear-gradient(to left top, #fff8d4, #ffbbbb)",
                                backgroundSize: "100% 100%",
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                textAlign: "left",
                                alignItems: "flex-start",
                                justifyContent: "center",
                                flexDirection: "column",
                                flexWrap: "nowrap",
                                position: "relative"
                            }}
                        >
                            {
                                <div
                                    style={{
                                        // 上下、左右の余白を50pxにする
                                        width: `${1200 - 2 * 50}px`,
                                        height: `${630 - 2 * 50}px`,
                                        backgroundColor: "#ffffff",
                                        display: "flex",
                                        textAlign: "center",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        position: "absolute",
                                        borderRadius: "50px",
                                        // 中央ぞろえ
                                        left: "50px",
                                        top: "50px",
                                        // shadowをつける
                                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                                    }}
                                >
                                    {anime_title.map((title, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                width: "85%",
                                                fontSize: 40,
                                                fontStyle: "normal",
                                                fontWeight: "bold",
                                                color: "#000",
                                                padding: "5px 5px",
                                                lineHeight: 1,
                                                marginBottom: "30px",
                                                whiteSpace: "nowrap",
                                                wordWrap: "break-word",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                position: "absolute",
                                                left: "1%",
                                                top: `${index * 50}px`,
                                            }}
                                        >
                                            {title}
                                        </div>
                                    ))}
                                </div>
                            }
                            {
                                // iconを表示、右下に配置
                                <img src="https://raw.githubusercontent.com/AkaakuHub/anirishu/main/public/favicons/android-chrome-256x256.png" style={{
                                    position: "absolute",
                                    width: "100px",
                                    height: "100px",
                                    bottom: "100px",
                                    right: "100px",
                                }} />
                            }
                        </div>
                    ),
                    {
                        width: 1200,
                        height: 630,
                        fonts: [
                            {
                                name: 'MPLUSRounded1c',
                                data: fontArrayBuffer,
                                style: 'normal',
                                weight: 500,
                            },
                        ]
                    }
                );
            } else {//クエリ異常
                return failureImg;
            }
        } else {
            return failureImg;
        }
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
