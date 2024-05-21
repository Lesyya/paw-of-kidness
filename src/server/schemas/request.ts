import { z } from 'zod';

export const createRequestSchema = z.object({
  animalId: z.number().optional(),
  info: z.object({
    age: z.string(),
    children: z.string(),
    pet: z.string(),
    place: z.string(),
    lifestyle: z.string(),
    time: z.string(),
    experience: z.string(),
  }),
  preference: z.object({
    kindPref: z.string(),
    kindImportance: z.number(),
    sexPref: z.string(),
    sexImportance: z.number(),
    agePref: z.string(),
    ageImportance: z.number(),
    breedPref: z.string(),
    breedImportance: z.number(),
    sizePref: z.string(),
    sizeImportance: z.number(),
    colorPref: z.string(),
    colorImportance: z.number(),
    sterilizedPref: z.string(),
    sterilizedImportance: z.number(),
  }),
});

export const approveRequestSchema = z.object({
  requestId: z.number(),
  animalId: z.number(),
});

export const declineRequestSchema = z.object({
  requestId: z.number(),
});
