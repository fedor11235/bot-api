import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getPromocode(idUser: any): Promise<any> {
    const promocode = String(new Date().valueOf());
    await this.prisma.promoCode.create({
      data: {
        idUser: idUser,
        code: promocode,
      },
    });
    return promocode;
  }
  async getProfile(idUser: any): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        idUser: idUser,
      },
    });
    return user;
  }
  async getCheckUser(idUser: any): Promise<any> {
    const isUserChanel = await this.prisma.userChanel.findFirst({
      where: {
        idUser: idUser,
      },
    });
    if (isUserChanel) {
      return 'exist';
    }
    return 'empty';
  }
}
