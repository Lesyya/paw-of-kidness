import type { AnimalInfoDTO } from '@/types/animal';
import type { InferCriteria, RequestPreviewDTO } from '@/types/request';

export enum UserAgeEnum {
  '<18' = 'до 18',
  '18-35' = '18-35',
  '35-60' = '35-60',
  '>60' = '60+',
}

export enum UserPetsEnum {
  'dog' = 'Собаки/и',
  'cat' = 'Кішка/и',
  'both' = 'Собака/и і кішка/и',
  'none' = 'Немає',
}

export enum UserPlaceEnum {
  'house' = 'Будинок',
  'apartment' = 'Квартира',
  'aviary' = 'Вольєр',
}

export enum UserLifestyleEnum {
  'active' = 'Активний',
  'normal' = 'Помірно активний',
  'nonactive' = 'Неактивний',
}

export enum UserTimeEnum {
  'big' = 'Багато',
  'medium' = 'Помірно',
  'small' = 'Мало',
}

export enum UserChildrenEnum {
  'Yes' = 'Так',
  'No' = 'Ні',
}

export enum UserExperiencedEnum {
  'Yes' = 'Так',
  'No' = 'Ні',
}

export type UserAgeType = keyof typeof UserAgeEnum;
export type UserPetsType = keyof typeof UserPetsEnum;
export type UserPlaceType = keyof typeof UserPlaceEnum;
export type UserLifestyleType = keyof typeof UserLifestyleEnum;
export type UserTimeType = keyof typeof UserTimeEnum;
export type UserChildrenType = keyof typeof UserChildrenEnum;
export type UserExperiencedType = keyof typeof UserExperiencedEnum;

export type UserDTO = {
  id: number;
  name: string;
  number: string;
  email: string;
  isAdmin: boolean;
};

export type UserInfoDTO = {
  id: number;
  age: UserAgeType;
  pet: UserPetsType;
  place: UserPlaceType;
  lifestyle: UserLifestyleType;
  time: UserTimeType;
  children: UserChildrenType;
  experience: UserExperiencedType;
};

export type UserPreferenceDTO = InferCriteria<Omit<AnimalInfoDTO, 'id'>>;

export type UserPreviewDTO = UserDTO & {
  request?: RequestPreviewDTO;
};

export type UserDetails = UserDTO &
  UserInfoDTO & {
    preference: UserPreferenceDTO;
  };
