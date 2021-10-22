import { Response } from 'express';

import { ProfileUserService } from '@/services/ProfileUserService';
import { IRequest } from '@/types';

export class ProfileUserController {
  async handle(req: IRequest, res: Response) {
    const { userId } = req;

    const service = new ProfileUserService();
    const result = await service.execute(userId);

    return res.json(result);
  }
}
