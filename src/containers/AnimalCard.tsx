import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  AnimalSexEnum,
  AnimalKindEnum,
  AnimalAgeEnum,
  AnimalSizeEnum,
  AnimalColorEnum,
  AnimalBreedEnum,
} from '@/types/animal';
import { cn } from '@/utils';
import useAuth from '@/context/auth/useAuth';

import type { AnimalDTO } from '@/types/animal';

export type AnimalCardProps = {
  animal: AnimalDTO;
  detailsPage?: boolean;
};

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, detailsPage }) => {
  const { isAdmin } = useAuth();

  const className: string = cn(
    'overflow-hidden relative rounded-lg bg-orange-100',
    detailsPage ? 'h-fit max-w-[400px]' : 'max-w-[300px]',
  );

  return (
    <div className={className}>
      <div className="absolute top-5 z-10 flex flex-col gap-4 text-white">
        {animal.isPriority && isAdmin && <p className="rounded-r bg-orange-400 px-2 py-1">Пріоритет</p>}
        {animal.status === 'adopted' && <p className="rounded-r bg-orange-400 px-2 py-1">В сімʼї</p>}
      </div>

      <div className="relative">
        {detailsPage ? (
          <Image src={animal.avatar_url} width={400} height={320} alt="Animal picture" />
        ) : (
          <Link href={`/animals/${animal.id}`}>
            <Image src={animal.avatar_url} width={400} height={320} alt="Animal picture" />
          </Link>
        )}

        {animal.score && (
          <p className="absolute bottom-0 right-0 bg-orange-400 px-2 py-1 text-white">{animal.score.toFixed(2)}</p>
        )}
      </div>

      <div className="flex flex-col gap-1 px-8 py-3">
        <div className="mb-1 flex items-center justify-between">
          <h3>{animal.name}</h3>
          <p className="text-orange-500">ID {animal.id}</p>
        </div>

        <div className="flex items-center justify-between">
          <p>{AnimalKindEnum[animal.kind]}</p>
          <p>{AnimalSexEnum[animal.sex]}</p>
        </div>

        <div className="flex items-center justify-between">
          <p>{AnimalAgeEnum[animal.age]}</p>
          <p>{AnimalBreedEnum[animal.breed]}</p>
        </div>

        <div className="flex items-center justify-between">
          <p>{AnimalSizeEnum[animal.size]}</p>
          <p>{AnimalColorEnum[animal.color]}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="w-full">{animal.isSterilized ? 'Стерилізована' : 'Не стерилізована'}</p>
          {!detailsPage && (
            <Link className="flex-1 text-orange-600 underline" href={`/animals/${animal.id}`}>
              Більше
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
