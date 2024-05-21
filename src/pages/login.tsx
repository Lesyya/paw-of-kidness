import React from 'react';
import Head from 'next/head';

import Login from '@/templates/Login/Login';

const LoginPage: React.FC = () => {
  const pageTitle = `Вхід — Лапа Добра`;
  const pageDescription = `Вхід на сайт Лапа Добра.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>

      <Login />
    </>
  );
};

export default LoginPage;
