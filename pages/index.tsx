import Head from 'next/head';

import style from '@/styles/Home.module.css';
import LayoutDefault from '@/layout/layout-default';
import StartStreamingModal from '@/components/start-streaming-modal';

export default function Home() {
  return (
    <LayoutDefault hideHeaderLogo={true}>
      <Head>
        <title>Snitch World</title>
        <meta name="description" content="Snitch World" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.main}>
        <StartStreamingModal />
      </main>
    </LayoutDefault>
  );
};
