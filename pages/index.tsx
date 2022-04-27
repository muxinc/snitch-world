import Head from 'next/head'
import Image from 'next/image'

import styles from '@/styles/Home.module.css'
import Link from 'next/link'

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
  )
}
