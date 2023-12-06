import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Script from 'next/script';
import Newslist from '../../../public/data/newslist.json';

const newslist: { [key: string]: any } = Newslist;

const Home = () => {
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const [text, setText] = useState<string>();
    const inputHandler = (e: { target: { value: string } }) => {
        setText(e.target.value);
    };
    const nid = router.query.nid ? router.query.nid : "0";
    const ogImage = nid != "" ? `${baseUrl}/api/ogp?nid=${router.query.nid}` : "https://raw.githubusercontent.com/AkaakuHub/anirishu/main/public/default.png";
    const docTitle = nid != "" ? `${newslist[nid as string]} | あにりしゅ` : "News | あにりしゅ";
    //
    return (
        <div>
            <Head>
                <title>{docTitle}</title>
                <meta charSet="utf-8" />
                <meta name="description" content="アニメの履修登録を行うことができるサイトです。" />
                <meta name="keywords" content="アニメ,あにめ,anime,ANIME,履修登録,course registration" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={baseUrl} />
                <meta
                    property="og:image"
                    key="ogImage"
                    content={ogImage}
                />
                <meta property="og:site_name" content="あにりしゅ！" />
                <meta property="og:locate" content="ja_JP" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="あにりしゅ！" />
                <meta name="twitter:description" content="アニメの履修登録を行うことができるサイトです。" />
                <meta name="twitter:image" content={ogImage} />
            </Head>
            <div className="container">
                <iframe id="iframe_main" src="/html/news/index.html"></iframe>
            </div>
            <Script id="sendquery" type="text/javascript" src="/globals_news.js" />
        </div>
    );
};
export default Home;
