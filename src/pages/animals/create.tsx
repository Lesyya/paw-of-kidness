import React from 'react';
import Head from 'next/head';

import CreateAnimal from '@/templates/CreateAnimal/CreateAnimal';

const CreateAnimalPage: React.FC = () => {
  const pageTitle = `Додати тварину — Лапа Добра`;
  const pageDescription = `Додати тварину на сайт Лапа Добра.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>

      <CreateAnimal />
    </>
  );
};

export default CreateAnimalPage;
