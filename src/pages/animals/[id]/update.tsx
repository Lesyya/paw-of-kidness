import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import UpdateAnimal from '@/templates/UpdateAnimal/UpdateAnimal';
import api from '@/api';

const UpdateAnimalPage: React.FC = () => {
  const router = useRouter();

  const { data: animal } = api.animal.getAnimalDetails.useQuery(
    { id: Number(router.query.id) },
    { refetchOnWindowFocus: false },
  );

  const pageTitle = `Update ${animal?.name} — Лапа Добра`;
  const pageDescription = animal?.description;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={animal?.avatar_url} />
      </Head>

      {animal && <UpdateAnimal animal={animal} />}
    </>
  );
};

export default UpdateAnimalPage;
