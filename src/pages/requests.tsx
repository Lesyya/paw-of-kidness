import React from 'react';
import Head from 'next/head';

import Requests from '@/templates/Requests/Requests';

const RequestsPage: React.FC = () => {
  const pageTitle = `Запити — Лапа Добра`;
  const pageDescription = `Місце де ти можеш побачити всі запити`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>

      <Requests />
    </>
  );
};

export default RequestsPage;
