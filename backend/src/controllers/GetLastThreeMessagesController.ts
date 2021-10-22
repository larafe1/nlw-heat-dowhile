import { Request, Response } from 'express';

import { GetLastThreeMessagesService } from '@/services/GetLastThreeMessagesService';

export class GetLastThreeMessagesController {
  async handle(_: Request, res: Response) {
    const service = new GetLastThreeMessagesService();
    const result = await service.execute();

    return res.json(result);
  }
}
