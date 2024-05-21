import React from 'react';

import PreferenceColumn from './PreferenceColumn';
import {
  AnimalSexEnum,
  AnimalAgeEnum,
  AnimalKindEnum,
  AnimalBreedEnum,
  AnimalSizeEnum,
  AnimalColorEnum,
} from '@/types/animal';

import type { UserPreferenceDTO } from '@/types/user';

export type PreferenceCardProps = {
  preference: UserPreferenceDTO;
};

const UserPreferenceCard: React.FC<PreferenceCardProps> = ({ preference }) => {
  const criteriaValues: string[] = [
    'Рід', //
    'Стать',
    'Вік',
    'Порода',
    'Розмір',
    'Колір',
    'Стерилізація',
  ];

  const preferenceValues: string[] = [
    AnimalKindEnum[preference.kindPref],
    AnimalSexEnum[preference.sexPref],
    AnimalAgeEnum[preference.agePref],
    AnimalBreedEnum[preference.breedPref],
    AnimalSizeEnum[preference.sizePref],
    AnimalColorEnum[preference.colorPref],
    preference.sterilizedPref ? 'Так' : 'Ні',
  ];

  const importanceValues: number[] = [
    preference.kindImportance,
    preference.sexImportance,
    preference.ageImportance,
    preference.breedImportance,
    preference.sizeImportance,
    preference.colorImportance,
    preference.sterilizedImportance,
  ];

  return (
    <div className="flex items-start gap-6">
      <PreferenceColumn title="Критерії" values={criteriaValues} />
      <PreferenceColumn title="Запит" values={preferenceValues} />
      <PreferenceColumn title="Важливість" values={importanceValues} />
    </div>
  );
};

export default UserPreferenceCard;
