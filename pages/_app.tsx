import type { AppProps } from 'next/app';

import 'normalize.css';
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
