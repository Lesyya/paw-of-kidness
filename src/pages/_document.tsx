import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

import type { NextPage } from 'next';

const Document: NextPage = () => {
  return (
    <Html lang="uk">
      <Head />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
