import React from 'react';
import Link from 'next/link';

import {
  UserAgeEnum,
  UserPetsEnum,
  UserPlaceEnum,
  UserLifestyleEnum,
  UserTimeEnum,
  UserExperiencedEnum,
} from '@/types/user';
import useRequest from '@/context/request/useRequest';
import api from '@/api';
import useToast from '@/components/toast/useToast';

import type { RequestDTO } from '@/types/request';

export type UserCardProps = {
  request: RequestDTO;
  showFooter?: boolean;
  animalId?: number;
  onUpdate?: () => void;
};

const UserCard: React.FC<UserCardProps> = ({ request, showFooter, animalId, onUpdate }) => {
  const { addRequest } = useRequest();
  const { toast } = useToast();

  const { user, info } = request;

  const { mutate: approveAnimal } = api.request.approveRequest.useMutation({
    onError: error => {
      toast({
        title: 'Помилка!',
        description: error.message,
        variant: 'destructive',
      });
    },

    onSuccess: () => {
      toast({
        title: 'Успішно!',
        description: 'Тварину додано до запиту',
      });

      onUpdate?.();
    },
  });

  const { mutate: declineRequest } = api.request.declineRequest.useMutation({
    onError: error => {
      toast({
        title: 'Помилка!',
        description: error.message,
        variant: 'destructive',
      });
    },

    onSuccess: () => {
      toast({
        title: 'Успішно!',
        description: 'Запит відхилено',
      });

      onUpdate?.();
    },
  });

  const handleAddRequest = (): void => {
    addRequest(request);
  };

  const handleApproveAnimal = (): void => {
    if (!animalId) return;

    approveAnimal({ requestId: request.id, animalId });
  };

  const handleDeclineRequest = (): void => {
    declineRequest({ requestId: request.id });
  };

  return (
    <div className="flex w-[370px] flex-col gap-2 overflow-hidden whitespace-nowrap rounded-lg bg-orange-100 px-8 py-3 text-center">
      <p className="font-h4">{user.name}</p>
      <p className="font-h4 text-orange-500">ID {user.id}</p>
      <p className="font-lg text-orange-500">+{user.number}</p>

      <div className="grid grid-cols-2 justify-between gap-2">
        <p className="text-start">Вік</p>
        <p className="text-end">{UserAgeEnum[info.age]}</p>

        <p className="text-start">Маленькі діти</p>
        <p className="text-end">{info.children === 'Yes' ? 'Так' : 'Ні'}</p>

        <p className="text-start">Інші улюбленці</p>
        <p className="text-end">{UserPetsEnum[info.pet]}</p>

        <p className="text-start">Проживанння</p>
        <p className="text-end">{UserPlaceEnum[info.place]}</p>

        <p className="text-start">Стиль життя</p>
        <p className="text-end">{UserLifestyleEnum[info.lifestyle]}</p>

        <p className="text-start">Час</p>
        <p className="text-end">{UserTimeEnum[info.time]}</p>

        <p className="text-start">Досвід</p>
        <p className="text-end">{UserExperiencedEnum[info.experience]}</p>
      </div>

      {showFooter &&
        (animalId ? (
          <div className="flex items-center justify-between">
            <button type="button" className="font-h4 text-center text-orange-500" onClick={handleApproveAnimal}>
              Схвалити
            </button>
            <button type="button" className="font-h4 text-center text-orange-800" onClick={handleDeclineRequest}>
              Відхилити
            </button>
          </div>
        ) : (
          <Link
            className="font-h4 text-center text-orange-500 hover:underline"
            href="/animals"
            onClick={handleAddRequest}
          >
            Підібрати
          </Link>
        ))}
    </div>
  );
};

export default UserCard;
