import React from 'react';
import Head from 'next/head';

import Contacts from '@/templates/Contacts/Contacts';

const ContactsPage: React.FC = () => {
  const pageTitle = `Контакти — Лапа Добра`;
  const pageDescription = `Місце де ти можеш знайти всю інформацію про наші контакти та зв'язатися з нами.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>

      <Contacts />
    </>
  );
};

export default ContactsPage;
