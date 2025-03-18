import type { ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import type { AppProps } from 'next/app'
import Script from 'next/script';

import '../styles/globals.css'

type EnhancedAppProps = AppProps & {
  Component: React.ComponentType<any> & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

function MyApp({ Component, pageProps }: EnhancedAppProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  // @ts-ignore
  const page = <Component {...pageProps} />;

  return getLayout(
    <>
      {page}
      <Head>
        {/* Google Analytics */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KGLM87W');` }}></script>
      </Head>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
    </>
  )
}

export default MyApp
