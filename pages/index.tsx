import Head from 'next/head';
import Link from 'next/link';

import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Snitch World</title>
        <meta name="description" content="Snitch World" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href={'./studio'}>Studio</Link>
      </main>

      <footer>
        Foot.
      </footer>
    </div>
  );
};
