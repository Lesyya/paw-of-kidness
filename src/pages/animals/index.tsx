import React from 'react';
import Head from 'next/head';

import Animals from '@/templates/Animals/Animals';

const AnimalsPage: React.FC = () => {
  const pageTitle = `Тваринки — Лапа Добра`;
  const pageDescription = `Місце де ти можеш знайти всю інформацію про наших тваринок та дізнатися більше про них.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>

      <Animals />
    </>
  );
};

export default AnimalsPage;
