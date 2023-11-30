import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Script from 'next/script';

const Home = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const [text, setText] = useState<string>();
    const inputHandler = (e: { target: { value: string } }) => {
        setText(e.target.value);
    };
    return (
        <div>
            <Head>
                <title>あにりしゅ！- News</title>
                <meta charSet="utf-8" />
                <meta name="description" content="アニメの履修登録を行うことができるサイトです。" />
                <meta name="keywords" content="アニメ,あにめ,anime,ANIME,履修登録,course registration" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${baseUrl}`} />
                <meta property="og:image" content="/default.png" />
                <meta property="og:site_name" content="あにりしゅ！" />
                <meta property="og:locate" content="ja_JP" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="あにりしゅ！" />
                <meta name="twitter:description" content="アニメの履修登録を行うことができるサイトです。" />
                <meta name="twitter:image" content="/default.png" />
            </Head>
            <div className="container">
                <iframe id="iframe_main" src="/html/news/index.html"></iframe>
            </div>
            <Script id="sendquery" type="text/javascript" src="/globals_news.js" />
        </div>
    );
};
export default Home;
