import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';

import { createTRPCRouter, publicProcedure } from '@/server/trpc';
import protectedProcedure from '@/server/utils/protectedProcedure';
import { addTokenCookie, removeTokenCookie } from '@/server/utils/cookies';
import { registerSchema, loginSchema } from '@/server/schemas/auth';

const authRouter = createTRPCRouter({
  getMe: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),

  register: publicProcedure //
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const { password, ...rest } = input;
      const hashedPassword = await bcrypt.hash(input.password, 12);

      const user = await ctx.prisma.user.create({
        data: {
          password: hashedPassword,
          ...rest,
        },
      });

      addTokenCookie(ctx.res, String(user.id));
    }),

  login: publicProcedure //
    .input(loginSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Користувача не знайдено',
        });
      }

      const isValidPassword = await bcrypt.compare(input.password, user.password);

      if (!isValidPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Неправильна пошта або пароль',
        });
      }

      addTokenCookie(ctx.res, String(user.id));
    }),

  logout: protectedProcedure.mutation(({ ctx }) => {
    removeTokenCookie(ctx.res);
  }),
});

export default authRouter;
