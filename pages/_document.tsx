import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* TODO - We should probably bring these fonts local to the project */}
        <link href="https://static.mux.com/fonts/fonts.css" rel="stylesheet" key="test"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
