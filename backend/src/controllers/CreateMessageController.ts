import { Response } from 'express';

import { CreateMessageService } from '@/services/CreateMessageService';
import { CreateMsgControllerRequestBody, IRequest } from '@/types';

export class CreateMessageController {
  async handle(req: IRequest, res: Response) {
    const { message } = req.body as CreateMsgControllerRequestBody;
    const { userId } = req;

    const service = new CreateMessageService();
    const result = await service.execute(message, userId);

    return res.json(result);
  }
}
