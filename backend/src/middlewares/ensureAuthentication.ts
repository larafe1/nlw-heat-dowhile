import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { IRequest } from '@/types';

import config from '@/config';

function ensureAuthentication(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({
      Error: 'Invalid token'
    });
  }

  const [_, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, config.jwtSecret);
    req.userId = sub as string;

    return next();
  } catch (err) {
    res.status(401).json({ Error: err });
  }
}

export default ensureAuthentication;
