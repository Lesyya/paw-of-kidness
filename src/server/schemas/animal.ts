import { z } from 'zod';

export const getAnimalsSchema = z.object({
  sex: z.string().optional(),
  age: z.string().optional(),
  kind: z.string().optional(),
  breed: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  status: z.string().optional(),
  isSterilized: z.boolean().optional(),
  userInfo: z
    .object({
      age: z.string(),
      children: z.string(),
      pet: z.string(),
      place: z.string(),
      lifestyle: z.string(),
      time: z.string(),
      experience: z.string(),
    })
    .optional(),
});

export const getAnimalDetailsSchema = z.object({
  id: z.number(),
  userInfo: z
    .object({
      age: z.string(),
      children: z.string(),
      pet: z.string(),
      place: z.string(),
      lifestyle: z.string(),
      time: z.string(),
      experience: z.string(),
    })
    .optional(),
});

export const createAnimalSchema = z.object({
  name: z.string(),
  description: z.string(),
  avatar_url: z.string(),
  sex: z.string(),
  age: z.string(),
  kind: z.string(),
  breed: z.string(),
  size: z.string(),
  color: z.string(),
  isSterilized: z.boolean(),
  isPriority: z.boolean(),
  preference: z.object({
    agePref: z.string(),
    ageImportance: z.number(),
    childrenPref: z.string(),
    childrenImportance: z.number(),
    petPref: z.string(),
    petImportance: z.number(),
    placePref: z.string(),
    placeImportance: z.number(),
    lifestylePref: z.string(),
    lifestyleImportance: z.number(),
    timePref: z.string(),
    timeImportance: z.number(),
    experiencePref: z.string(),
    experienceImportance: z.number(),
  }),
});

export const updateAnimalSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  avatar_url: z.string(),
  sex: z.string(),
  age: z.string(),
  kind: z.string(),
  breed: z.string(),
  size: z.string(),
  color: z.string(),
  status: z.string(),
  isSterilized: z.boolean(),
  isPriority: z.boolean(),
  preference: z.object({
    agePref: z.string(),
    ageImportance: z.number(),
    childrenPref: z.string(),
    childrenImportance: z.number(),
    petPref: z.string(),
    petImportance: z.number(),
    placePref: z.string(),
    placeImportance: z.number(),
    lifestylePref: z.string(),
    lifestyleImportance: z.number(),
    timePref: z.string(),
    timeImportance: z.number(),
    experiencePref: z.string(),
    experienceImportance: z.number(),
  }),
});
