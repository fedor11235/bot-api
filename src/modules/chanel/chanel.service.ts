import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class ChanelService {
  constructor(private prisma: PrismaService) {}
  async getChanels(username: any): Promise<any> {
    const chanels = await this.prisma.catalog.findFirst({
      where: {
        username: username,
      },
    });
    return chanels;
  }
  async createChanelUser(idUser: any, idChanel: any): Promise<any> {
    const isUserChanel = await this.prisma.userChanel.findFirst({
      where: {
        idUser: idUser,
        idChanel: idChanel,
      },
    });
    if (isUserChanel) {
      return 'exist';
    }
    await this.prisma.userChanel.create({
      data: {
        idUser: idUser,
        idChanel: idChanel,
      },
    });
    await this.prisma.user.create({
      data: {
        idUser: idUser,
      },
    });
    return 'created';
  }
  async getChanelsUser(idUser: any): Promise<any> {
    const chanels = await this.prisma.userChanel.findMany({
      where: {
        idUser: idUser,
      },
    });
    return chanels;
  }
  async getChanelsCategories(categoryQuery: any): Promise<any> {
    let categoryFind;
    if (categoryQuery === 'all') {
      categoryFind = await this.prisma.catalog.findMany();
    } else {
      categoryFind = await this.prisma.catalog.findMany({
        where: {
          category: categoryQuery,
        },
      });
    }
    return categoryFind;
  }
}
