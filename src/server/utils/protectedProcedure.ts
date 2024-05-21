import { TRPCError } from '@trpc/server';

import { trpc } from '../trpc';

const isAuthed = trpc.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return next();
});

const protectedProcedure = trpc.procedure.use(isAuthed);

export default protectedProcedure;
