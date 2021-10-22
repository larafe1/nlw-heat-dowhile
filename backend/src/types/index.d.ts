import { Request } from 'express';

export type AppCallbackRequestQuery = {
  code: string;
};

export type AuthUserControllerRequestBody = {
  code: string;
};

export type CreateMsgControllerRequestBody = {
  message: string;
};

export interface IAccessTokenResponse {
  access_token: string;
}

export interface IUserResponse {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
}

export interface IRequest extends Request {
  userId: string;
}
