import { createTRPCRouter } from '@/server/trpc';
import { createRequestSchema, approveRequestSchema, declineRequestSchema } from '@/server/schemas/request';
import protectedProcedure from '@/server/utils/protectedProcedure';
import calculateScore from '@/server/utils/calculateScore';

import type { RequestDTO } from '@/types/request';

const requestRouter = createTRPCRouter({
  getUserRequest: protectedProcedure.query(async ({ ctx }) => {
    const request = await ctx.prisma.request.findFirst({
      where: {
        status: 'on_review',
        userId: Number((await ctx.user)?.user.id),
      },
      include: {
        user: true,
        info: true,
        preference: true,
        animal: {
          include: {
            preference: true,
          },
        },
      },
    });

    return request as RequestDTO;
  }),

  getRequests: protectedProcedure.query(async ({ ctx }) => {
    const requests = await ctx.prisma.request.findMany({
      where: {
        status: 'on_review',
      },
      include: {
        user: true,
        info: true,
        preference: true,
        animal: {
          include: {
            preference: true,
          },
        },
      },
    });

    return requests.map(request => {
      if (!request.animal) return request;

      return {
        ...request,
        animal: {
          ...request.animal,
          score: calculateScore(request.animal.preference, request.info),
        },
      };
    });
  }),

  createRequest: protectedProcedure.input(createRequestSchema).mutation(async ({ ctx, input }) => {
    const { preference, info, animalId } = input;
    const userId = Number((await ctx.user)?.user.id);

    await ctx.prisma.request.deleteMany({
      where: {
        userId,
        status: 'on_review',
      },
    });

    await ctx.prisma.request.create({
      data: {
        preference: {
          create: {
            ...preference,
          },
        },
        info: {
          create: {
            ...info,
          },
        },

        ...(animalId && {
          animal: {
            connect: {
              id: animalId,
            },
          },
        }),

        user: {
          connect: {
            id: userId,
          },
        },
        status: 'on_review',
      },
    });

    return 'success';
  }),

  approveRequest: protectedProcedure.input(approveRequestSchema).mutation(async ({ ctx, input }) => {
    const { requestId, animalId } = input;

    await ctx.prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: 'approved',

        animal: {
          connect: {
            id: animalId,
          },
        },
      },
    });

    await ctx.prisma.animal.update({
      where: {
        id: animalId,
      },
      data: {
        status: 'adopted',
      },
    });

    return 'success';
  }),

  declineRequest: protectedProcedure.input(declineRequestSchema).mutation(async ({ ctx, input }) => {
    const { requestId } = input;

    await ctx.prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        animalId: null,
      },
    });

    return 'success';
  }),
});

export default requestRouter;
