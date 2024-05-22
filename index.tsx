import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AnimalDetails from '@/templates/AnimalDetails/AnimalDetails';
import api from '@/api';
import useRequest from '@/context/request/useRequest';

const AnimalDetailsPage: React.FC = () => {
  const router = useRouter();
  const { request } = useRequest();

  const animalId = router.query.id ? Number(router.query.id) : null;

  const { data: animal } = api.animal.getAnimalDetails.useQuery(
    { id: Number(router.query.id), userInfo: request?.info },
    { refetchOnWindowFocus: false, enabled: !!animalId },
  );

  const pageTitle = `${animal?.name} — Лапа Добра`;
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

      {animal && <AnimalDetails animal={animal} />}
    </>
  );
};

export default AnimalDetailsPage;
