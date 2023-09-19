import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class OptService {
  constructor(private prisma: PrismaService) {}
  async createOpt(idUser: any, chanel: any): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { idUser: idUser },
    });
    await this.prisma.opt.deleteMany({
      where: { idUser: user.id },
    });
    const opt = await this.prisma.opt.create({
      data: {
        idUser: user.id,
        chanel: chanel,
      },
    });
    return 'ok';
  }
  async getOpt(idUser: any): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { idUser: idUser },
      include: {
        opts: true,
      },
    });
    return user.opts[0];
  }

  async setOpt(idUser: any, data: any): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { idUser: idUser },
      include: {
        opts: true,
      },
    });

    const opt = await this.prisma.opt.update({
      where: { id: user.opts[0].id },
      data: data,
    });

    return opt;
  }
}
