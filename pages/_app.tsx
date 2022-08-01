import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';

import 'normalize.css';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
