import axios from 'axios';
import { sign } from 'jsonwebtoken';

import config from '@/config';
import prismaClient from '@/prisma';
import { IAccessTokenResponse, IUserResponse } from '@/types';

export class AuthenticateUserService {
  async execute(code: string) {
    const url = config.githubOAuthUrl + '/access_token';

    const { data } = await axios.post<IAccessTokenResponse>(url, null, {
      headers: {
        Accept: 'application/json'
      },
      params: {
        client_id: config.githubClientId,
        client_secret: config.githubClientSecret,
        code
      }
    });

    const res = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${data.access_token}`
      }
    });

    const { id, name, login, avatar_url } = res.data;

    const user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    });
    if (!user) {
      await prismaClient.user.create({
        data: {
          github_id: id,
          name,
          login,
          avatar_url
        }
      });
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url
        }
      },
      config.jwtSecret,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    );

    return { user, token };
  }
}
