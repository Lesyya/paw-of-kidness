import React from 'react';
import { useRouter } from 'next/router';

import FilterSidebar from './FilterSidebar/FilterSidebar';
import AnimalCard from '@/containers/AnimalCard';
import api from '@/api';
import { cn } from '@/utils';
import useRequest from '@/context/request/useRequest';
import RequestCard from '@/containers/RequestCard';
import { LoadingButton } from '@/components/AppButton';

import type { AnimalStatusType } from '@/types/animal';

const Animals: React.FC = () => {
  const router = useRouter();
  const { request } = useRequest();

  const { data: animals, isFetching } = api.animal.getAnimals.useQuery(
    { ...router.query, isSterilized: router.query.isSterlized === 'true', userInfo: request?.info },
    { refetchOnWindowFocus: true },
  );

  const handleTabChange = async (status: AnimalStatusType): Promise<void> => {
    await router.push({ query: { status } });
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {request && <RequestCard request={request} showFooter={false} />}

      {!request && (
        <header className="flex flex-col items-center gap-4">
          <h1 className="font-h1 text-orange-900">Взяти тваринку</h1>
          <h2 className="font-h4 text-orange-700">
            Тут Ви можете вибрати тваринку, яка вам сподобалась і надіслати заявку на її взяття!
          </h2>
        </header>
      )}

      <div className="flex gap-10">
        <aside className="w-[250px]">
          <FilterSidebar />
        </aside>

        <div className="flex flex-col gap-4">
          <div className="flex max-w-[500px] items-center justify-between">
            <LoadingButton
              className={cn(
                'min-w-[150px] font-h3 cursor-pointer text-orange-700 justify-end',
                (!router.query.status || router.query.status === 'available') && 'underline',
              )}
              variant="link"
              onClick={() => handleTabChange('available')}
              loading={isFetching && router.query.status === 'available'}
            >
              Знайдені
            </LoadingButton>
            {!request && (
              <LoadingButton
                className={cn(
                  'font-h3 cursor-pointer text-orange-700',
                  router.query.status === 'adopted' && 'underline',
                )}
                variant="link"
                onClick={() => handleTabChange('adopted')}
                loading={isFetching && router.query.status === 'adopted'}
              >
                Влаштовані
              </LoadingButton>
            )}
          </div>

          <div className="grid grid-cols-[repeat(3,_minmax(0,_300px))] justify-start gap-6">
            {animals?.map(animal => <AnimalCard key={animal.id} animal={animal}/>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animals;
