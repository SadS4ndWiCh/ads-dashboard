import '@styles/globals.scss';
import type { AppProps } from 'next/app';

import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <meta name="msapplication-tap-highlight" content="no" />

      </Head>
      <Component {...pageProps} /> 
    </>
  )
}
export default MyApp
