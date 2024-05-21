import React from 'react';

import PreferenceColumn from './PreferenceColumn';
import {
  UserAgeEnum,
  UserExperiencedEnum,
  UserChildrenEnum,
  UserPetsEnum,
  UserPlaceEnum,
  UserLifestyleEnum,
  UserTimeEnum,
} from '@/types/user';

import type { AnimalPreferenceDTO } from '@/types/animal';

export type PreferenceCardProps = {
  preference: AnimalPreferenceDTO;
};

const PreferenceCard: React.FC<PreferenceCardProps> = ({ preference }) => {
  const criteriaValues: string[] = [
    'Вік',
    'Наявність дітей',
    'Наявність інших тварин',
    'Місце проживання',
    'Стиль життя',
    'Час на догляд',
    'Досвід утримання',
  ];

  const preferenceValues: string[] = [
    UserAgeEnum[preference.agePref],
    UserChildrenEnum[preference.childrenPref],
    UserPetsEnum[preference.petPref],
    UserPlaceEnum[preference.placePref],
    UserLifestyleEnum[preference.lifestylePref],
    UserTimeEnum[preference.timePref],
    UserExperiencedEnum[preference.experiencePref],
  ];

  const importanceValues: number[] = [
    preference.ageImportance,
    preference.childrenImportance,
    preference.petImportance,
    preference.placeImportance,
    preference.lifestyleImportance,
    preference.timeImportance,
    preference.experienceImportance,
  ];

  return (
    <div className="mt-4 flex gap-6">
      <PreferenceColumn title="Критерії" values={criteriaValues} />
      <PreferenceColumn title="Рекомендації" values={preferenceValues} />
      <PreferenceColumn title="Важливість" values={importanceValues} />
    </div>
  );
};

export default PreferenceCard;
