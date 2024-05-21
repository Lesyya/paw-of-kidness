import type { UserInfoDTO } from '@/types/user';
import type { InferCriteria } from '@/types/request';

export enum AnimalSexEnum {
  male = 'Хлопчик',
  female = 'Дівчинка',
}

export enum AnimalAgeEnum {
  '<1' = 'до 1 року',
  '1-3' = '1 - 3 роки',
  '3-5' = '3 - 5 років',
  '>5' = 'більше 5 років',
}

export enum AnimalKindEnum {
  cat = 'Котик',
  dog = 'Собачка',
}

export enum AnimalBreedEnum {
  pure = 'Породиста',
  mixed = 'Метис',
}

export enum AnimalSizeEnum {
  small = 'до 35 см',
  medium = '35 - 50 см',
  big = 'більше 50 см',
}

export enum AnimalColorEnum {
  light = 'Світлий',
  dark = 'Темний',
  mixed = 'Змішаний',
}

export enum AnimalStatusEnum {
  available = 'В притулку',
  adopted = 'В сімʼї',
}

export type AnimalSexType = keyof typeof AnimalSexEnum;
export type AnimalAgeType = keyof typeof AnimalAgeEnum;
export type AnimalKindType = keyof typeof AnimalKindEnum;
export type AnimalBreedType = keyof typeof AnimalBreedEnum;
export type AnimalSizeType = keyof typeof AnimalSizeEnum;
export type AnimalColorType = keyof typeof AnimalColorEnum;
export type AnimalStatusType = keyof typeof AnimalStatusEnum;

export type AnimalInfoDTO = {
  sex: AnimalSexType;
  age: AnimalAgeType;
  kind: AnimalKindType;
  breed: AnimalBreedType;
  size: AnimalSizeType;
  color: AnimalColorType;
  status: AnimalStatusType;
  sterilized: boolean;
};

export type AnimalDTO = {
  id: number;
  name: string;
  description: string;
  avatar_url: string;
  isPriority: boolean;
  score?: number;
} & Omit<AnimalInfoDTO, 'sterilized'> & {
    isSterilized: boolean;
  };

export type AnimalPreferenceDTO = InferCriteria<Omit<UserInfoDTO, 'id'>>;

export type AnimalDetailsDTO = AnimalDTO & {
  preference: AnimalPreferenceDTO;
};
