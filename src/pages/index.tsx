import React from 'react';
import Head from 'next/head';

import Home from '@/templates/Home/Home';

const HomePage: React.FC = () => {
  const pageTitle = `Лапа Добра`;
  const pageDescription = `Ми команда волонтерів, що допомагає тваринкам знайди люблячий дім, а людям - вірного друга. Вибрати тваринку ти можеш самостійно, або ж за допомогою нашого опитувальника - просто заповни анкету і наш волонтер підбере її тобі!`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>

      <Home />
    </>
  );
};

export default HomePage;
