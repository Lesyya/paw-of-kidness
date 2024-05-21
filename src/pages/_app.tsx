import Head from 'next/head';
import { Inter } from 'next/font/google';

import AppLayout from '@/templates/AppLayout/AppLayout';
import AuthProvider from '@/context/auth/AuthProvider';
import RequestProvider from '@/context/request/RequestProvider';
import api from '@/api';

import '@/styles/globals.css';
import '@/styles/normalize.css';
import '@/styles/tailwind.css';

import type { AppType } from 'next/app';
import type { AppLayoutProps } from '@/templates/AppLayout/AppLayout';

const inter = Inter({
  subsets: ['latin'],
});

const App: AppType<AppLayoutProps> = ({
  Component, //
  pageProps,
}) => {
  return (
    <>
      <Head>
        <meta name="application-name" content="AlphaNovel: Read novels online" />
        <meta name="theme-color" content="#fff7ed" />

        <meta
          name="viewport"
          content="minimum-scale=1, maximum-scale=5, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Лапа Добра" />
        <meta key="og:image" property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/background.png`} />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={inter.className}>
        <AuthProvider>
          <RequestProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </RequestProvider>
        </AuthProvider>
      </div>
    </>
  );
};

export default api.withTRPC(App);
