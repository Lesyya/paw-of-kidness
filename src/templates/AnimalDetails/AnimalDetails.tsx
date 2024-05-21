import React from 'react';
import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import { useRouter } from 'next/router';

import AppButton, { LoadingButton } from '@/components/AppButton';
import AnimalCard from '@/containers/AnimalCard';
import PreferenceCard from '@/containers/AnimalPreferenceCard';
import useAuth from '@/context/auth/useAuth';
import useRequest from '@/context/request/useRequest';
import RequestCard from '@/containers/RequestCard';
import api from '@/api';
import useToast from '@/components/toast/useToast';

import type { AnimalDetailsDTO } from '@/types/animal';

export type AnimalDetailsProps = {
  animal: AnimalDetailsDTO;
};

const AnimalDetails: React.FC<AnimalDetailsProps> = ({ animal }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { isAdmin, authorized } = useAuth();
  const { request, removeRequest } = useRequest();

  const { mutate: approveAnimal, isPending } = api.request.approveRequest.useMutation({
    onError: error => {
      toast({
        title: 'Помилка',
        description: error.message,
        variant: 'destructive',
      });
    },

    onSuccess: async () => {
      toast({
        title: 'Успішно',
        description: 'Тваринка успішно запропонована',
      });

      removeRequest();
      await router.push('/requests');
    },
  });

  const handleApproveAnimal = (): void => {
    if (!request) return;

    approveAnimal({ requestId: request.id, animalId: animal.id });
  };

  return (
    <div className="relative flex w-full flex-col items-center gap-4">
      {request && <RequestCard request={request} showFooter={false} />}

      <AppButton variant="link" className="absolute left-0 top-0 p-0 text-lg text-orange-900" asChild>
        <Link href="/animals">
          <Icon path={mdiChevronLeft} size="32px" />
          Назад
        </Link>
      </AppButton>

      <h1 className="font-h1 text-orange-900">{animal.name}</h1>
      <h2 className="font-h4 text-orange-700">Тут Ви можете дізнатися детальнішу інформацію про тваринку</h2>

      <div className="mt-8 flex gap-6">
        <AnimalCard animal={animal} detailsPage />

        <div className="flex flex-1 flex-col">
          <div className="flex flex-col items-center gap-4 rounded-lg bg-orange-100 px-4 pb-6 pt-1">
            <p className="text-lg font-medium text-orange-900">{animal.description}</p>

            {isAdmin ? (
              <div className="flex gap-4">
                {request && (
                  <LoadingButton
                    className="font-h4 px-[20px] py-[14px]"
                    loading={isPending}
                    onClick={handleApproveAnimal}
                  >
                    Запропонувати
                  </LoadingButton>
                )}
                <AppButton className="font-h4 px-[20px] py-[14px]" asChild>
                  <Link href={`/animals/${animal.id}/update`}>Редагувати</Link>
                </AppButton>
              </div>
            ) : (
              animal.status === 'available' && (
                <AppButton className="font-h4 px-[20px] py-[14px]" asChild>
                  <Link href={authorized ? `/quiz?animalId=${animal.id}` : `/login?redirect=/animals/${animal.id}`}>
                    Взяти тваринку
                  </Link>
                </AppButton>
              )
            )}
          </div>

          {isAdmin ? (
            <PreferenceCard preference={animal.preference} />
          ) : (
            animal.status === 'available' && (
              <p className="m-4">
                Натиснувши ‘Взяти тваринку’, Вам потрібно буде пройти опитування, якщо Ви ще цього не зробили, і Ваш
                запит направиться до нашого волонтера, який обробить його. <br />
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;
