import jwt from 'jsonwebtoken';

import env from '@/env';

import type { NextApiResponse } from 'next';

export const addTokenCookie = (res: NextApiResponse, userId: string) => {
  const token = jwt.sign({ id: String(userId) }, env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Max-Age=360000;`);
};

export const removeTokenCookie = (res: NextApiResponse) => {
  res.setHeader('Set-Cookie', `token=; Path=/; HttpOnly; Max-Age=-1;`);
};
