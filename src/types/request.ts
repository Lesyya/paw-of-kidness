import type { AnimalDTO, AnimalDetailsDTO } from '@/types/animal';
import type { UserDTO, UserInfoDTO, UserPreferenceDTO } from '@/types/user';

export type Criteria = 1 | 3 | 5;

export type InferCriteria<T extends object> = {
  [K in keyof T as `${string & K}Importance`]: Criteria;
} & {
  [K in keyof T as `${string & K}Pref`]: T[K];
};

export enum RequestStatusEnum {
  on_review = 'on_review',
  approved = 'approved',
  reject = 'rejected',
}

export type RequestStatusType = keyof typeof RequestStatusEnum;

export type RequestPreviewDTO = {
  id: number;
  status: RequestStatusType;
  animal: AnimalDTO;
};

export type RequestDTO = {
  id: number;
  status: RequestStatusType;
  user: UserDTO;
  info: UserInfoDTO;
  preference: UserPreferenceDTO;
  animal?: AnimalDetailsDTO;
};
