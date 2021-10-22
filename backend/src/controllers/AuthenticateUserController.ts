import { Request, Response } from 'express';

import { AuthenticateUserService } from '@/services/AuthenticateUserService';
import { AuthUserControllerRequestBody } from '@/types';

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { code } = req.body as AuthUserControllerRequestBody;
    const service = new AuthenticateUserService();

    try {
      const result = await service.execute(code);
      return res.json(result);
    } catch (err) {
      return res.json({ Error: err.message });
    }
  }
}
