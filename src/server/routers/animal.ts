import { TRPCError } from '@trpc/server';

import { createTRPCRouter, publicProcedure } from '@/server/trpc';
import {
  getAnimalsSchema,
  getAnimalDetailsSchema,
  createAnimalSchema,
  updateAnimalSchema,
} from '@/server/schemas/animal';
import calculateScore from '@/server/utils/calculateScore';

import type { AnimalDetailsDTO, AnimalDTO } from '@/types/animal';
import type { Prisma } from '.prisma/client';

const animalRouter = createTRPCRouter({
  getAnimals: publicProcedure.input(getAnimalsSchema).query(async ({ ctx, input }) => {
    const whereClause: Prisma.AnimalWhereInput = { status: 'available' };

    if (input.breed) whereClause.breed = input.breed;
    if (input.sex) whereClause.sex = input.sex;
    if (input.age) whereClause.age = input.age;
    if (input.kind) whereClause.kind = input.kind;
    if (input.size) whereClause.size = input.size;
    if (input.color) whereClause.color = input.color;
    if (input.status) whereClause.status = input.status;
    if (input.isSterilized) whereClause.isSterilized = input.isSterilized;

    const animals = await ctx.prisma.animal.findMany({
      where: whereClause,
      include: {
        preference: true,
      },
    });

    animals.sort((a, b) => {
      if (a.isPriority && !b.isPriority) return -1;
      if (!a.isPriority && b.isPriority) return 1;
      return 0;
    });

    if (input.userInfo) {
      const scoreAnimals = animals.map(animal => ({
        ...animal,
        score: calculateScore(animal.preference, input.userInfo),
      }));

      return scoreAnimals.sort((a, b) => b.score - a.score) as AnimalDTO[];
    }

    return animals as AnimalDTO[];
  }),

  getAnimalDetails: publicProcedure.input(getAnimalDetailsSchema).query(async ({ ctx, input }) => {
    const animal = await ctx.prisma.animal.findUnique({
      where: {
        id: input.id,
      },
      include: {
        preference: true,
      },
    });

    if (!animal) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Animal not found',
      });
    }

    if (input.userInfo) {
      return {
        ...animal,
        score: calculateScore(animal.preference, input.userInfo),
      } as AnimalDetailsDTO;
    }

    return animal as AnimalDetailsDTO;
  }),

  createAnimal: publicProcedure.input(createAnimalSchema).mutation(async ({ ctx, input }) => {
    const { preference, ...rest } = input;

    const animal = await ctx.prisma.animal.create({
      data: {
        preference: {
          create: {
            ...preference,
          },
        },
        ...rest,
        status: 'available',
      },
    });

    return animal.id;
  }),

  updateAnimal: publicProcedure.input(updateAnimalSchema).mutation(async ({ ctx, input }) => {
    const { id, preference, ...rest } = input;

    const animal = await ctx.prisma.animal.update({
      where: {
        id,
      },
      data: {
        preference: {
          update: {
            ...preference,
          },
        },
        ...rest,
      },
    });

    return animal.id;
  }),
});

export default animalRouter;
