import prismaClient from '@/prisma';
import { io } from '@/app';

export class CreateMessageService {
  async execute(text: string, userId: string) {
    const message = await prismaClient.message.create({
      data: {
        userId,
        text
      },
      include: {
        user: true
      }
    });

    const infoWS = {
      text: message.text,
      userId: message.userId,
      createdAt: message.created_at,
      user: {
        name: message.user.name,
        avatarUrl: message.user.avatar_url
      }
    };

    io.emit('newMessage', infoWS);

    return message;
  }
}
