import type { AppProps } from 'next/app';
import Head from 'next/head';

import 'normalize.css';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
