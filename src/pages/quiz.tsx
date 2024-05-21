import React from 'react';
import Head from 'next/head';

import Quiz from '@/templates/Quiz/Quiz';

const QuizPage: React.FC = () => {
  const pageTitle = `Анкета — Лапа Добра`;
  const pageDescription = `Відповідай на питання та допоможи нам зрозуміти, яку тварину тобі підібрати`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>

      <Quiz />
    </>
  );
};

export default QuizPage;
