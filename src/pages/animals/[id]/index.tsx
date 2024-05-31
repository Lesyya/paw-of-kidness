import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AnimalDetails from '@/templates/AnimalDetails/AnimalDetails';
import api from '@/api';
import useRequest from '@/context/request/useRequest';

const AnimalDetailsPage: React.FC = () => {
  const router = useRouter();
  const { request } = useRequest();

  const [animalId, setAnimalId] = useState<number | null>(null);

  const { data: animal, refetch } = api.animal.getAnimalDetails.useQuery(
    { id: animalId!, userInfo: request?.info },
    {
      enabled: !!animalId,
      refetchOnWindowFocus: false,
      retry: 3,
    }
  );

  useEffect(() => {
    if (router.query.id) {
      setAnimalId(Number(router.query.id));
      refetch();
    }
  }, [router.query.id]);

  const pageTitle = `${animal?.name || 'Тваринка'} — Лапа Добра`;
  const pageDescription = animal?.description || 'Місце де ти можеш знайти всю інформацію про наших тваринок та дізнатися більше про них.'

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
