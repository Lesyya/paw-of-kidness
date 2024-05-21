import React from 'react';
import Head from 'next/head';

import Register from '@/templates/Register/Register';

const RegisterPage: React.FC = () => {
  const pageTitle = `Реєстрація — Лапа Добра`;
  const pageDescription = `Місце де ти можеш зареєструватися та отримати доступ до всіх можливостей сайту.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>

      <Register />
    </>
  );
};

export default RegisterPage;
