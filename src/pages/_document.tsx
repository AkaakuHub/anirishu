import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#9bbeff" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#9bbeff" />
        <meta name="google-site-verification" content="RFbnQYDWuIYjQriQXZa7kxSYi3vEAoLHDt7bPtGi_Ps" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
