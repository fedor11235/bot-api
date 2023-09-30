import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class ModeService {
  constructor(private prisma: PrismaService) {}
  async getMode(idUser: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    });

    if (user) {
      return user.message_mode;
    }
    return 'standart';
  }
  async setMode(idUser: any, mode: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        message_mode: mode,
      },
    });
    return 'ok';
  }
}
