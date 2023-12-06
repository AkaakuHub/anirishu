import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import Newslist from '../../../../public/data/newslist.json';

const newslist: { [key: string]: any } = Newslist;

type Props = {
    nid: string;
};

export const getServerSideProps = async (
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> => {
    if (typeof context.params?.nid === "string") {
        return {
            props: {
                nid: context.params?.nid,
            },
        };
    } else {
        return {
            notFound: true,
        };
    }
};

const Page = ({ nid }: Props) => {
    const router = useRouter();
    // リダイレクト
    useEffect(() => {
        router.push(`/news/?nid=${nid}`).then(() => {
            // リダイレクトが完了したら0.1秒待ってからリロード
            setTimeout(() => {
                window.location.reload();
            }, 100);
        });
    }, []);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const ogImage = nid != "" ? `${baseUrl}/api/ogp?nid=${router.query.nid}` : "https://raw.githubusercontent.com/AkaakuHub/anirishu/main/public/default.png";
    const docTitle = nid != "" ? `${newslist[nid as string]} | あにりしゅ` : "News | あにりしゅ";
    return (
        <>
            <Head>
                <title>{docTitle}</title>
                <meta charSet="utf-8" />
                <meta name="description" content="アニメの履修登録を行うことができるサイトです。" />
                <meta name="keywords" content="アニメ,あにめ,anime,ANIME,履修登録,course registration" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${baseUrl}`} />
                <meta property="og:site_name" content="あにりしゅ！" />
                <meta property="og:locate" content="ja_JP" />
                <meta
                    property="og:image"
                    key="ogImage"
                    content={ogImage}
                />
                <meta
                    name="twitter:card"
                    key="twitterCard"
                    content="summary_large_image"
                />
                <meta name="twitter:title" content="あにりしゅ！" />
                <meta name="twitter:description" content="アニメの履修登録を行うことができるサイトです。" />
                <meta
                    name="twitter:image"
                    key="twitterImage"
                    content={ogImage}
                />
            </Head>
            <div>
                このページはすぐにリダイレクトされます。リダイレクトされない場合は
                <a href={`/news/?nid=${nid}`}>こちら</a>をクリックしてください。
            </div>
        </>
    );
};
export default Page;