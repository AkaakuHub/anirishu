import { ImageResponse, NextRequest } from "next/server";
import * as fs from 'fs';
import { loadGoogleFont } from '@/lib/font';
import Anime_title_obj from '../../../public/data/anime_title_obj.json';

const anime_title_obj: { [key: string]: any } = Anime_title_obj;

export const config = {
  runtime: "edge",
};


export default async function handler(req: NextRequest) {
  const fontArrayBuffer = await loadGoogleFont({
    family: 'M PLUS Rounded 1c',
    weight: 500,
  });
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has("aid");
    const aidValue = hasTitle
      ? searchParams.get("aid")?.toString()
      : null;
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
          let key: string = Object.keys(shared_this_anime_title).find(key => shared_this_anime_title[key]["aid"] === aid) || "";
          let koma = shared_this_anime_title[key]["koma"];
          anime_title.push(key);
        }
        if (anime_title.length > 11) {//12以上だとetcを表示
          anime_title = anime_title.slice(0, 11);
          anime_title.push("etc...(完全版はWebで確認！！)");
        }
        return new ImageResponse(
          (
            <div
              style={{
                backgroundColor: "#fff2e0",
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
              {anime_title.map((title, index) => (
                <div
                  key={index}
                  style={{
                    width: "98%",
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
        return new ImageResponse(
          (
            <div
              style={{
                backgroundColor: "#fff2e0",
                backgroundSize: "100% 100%",
                height: "100%",
                width: "100%",
                display: "flex",
                textAlign: "left",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                flexWrap: "nowrap",
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
                  wordWrap: "break-word",
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
                }}
              >
                アニメの履修登録ができるサイト
              </div>
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
      }
    } else {
      return new ImageResponse(
        (
          <div
            style={{
              backgroundColor: "#fff2e0",
              backgroundSize: "100% 100%",
              height: "100%",
              width: "100%",
              display: "flex",
              textAlign: "left",
              alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "column",
              flexWrap: "nowrap",
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
                wordWrap: "break-word",
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
              }}
            >
              アニメの履修登録ができるサイト
            </div>
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
    }
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}