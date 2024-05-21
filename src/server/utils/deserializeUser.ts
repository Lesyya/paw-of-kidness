import jwt from 'jsonwebtoken';

import env from '@/env';
import { removeTokenCookie } from './cookies';

import type { Prisma } from '@/server/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const getUser = async (req: NextApiRequest, prisma: Prisma) => {
  const { token } = req.cookies;

  if (!token) throw new Error('No token found');

  const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };

  if (!decoded) throw new Error('Invalid token');

  const user = await prisma.user.findUnique({
    where: { id: Number(decoded.id) },
  });

  if (!user) return null;

  const { password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
  };
};

const deserializeUser = async (req: NextApiRequest, res: NextApiResponse, prisma: Prisma) => {
  try {
    return await getUser(req, prisma);
  } catch {
    removeTokenCookie(res);
    return null;
  }
};

export default deserializeUser;
