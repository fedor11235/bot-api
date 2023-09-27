import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

// function uuidv4() {
//   return 'xxx_xxx_00_00'.replace(/[xy]/g, function(c) {
//     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getPromocode(idUser: any): Promise<any> {
    let promocode = ''
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for(let index = 0; index < 5; index += 1) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      promocode += alphabet[randomIndex]
    }
    for(let index = 0; index < 2; index += 1) {
      const randomIndex = Math.floor(Math.random() * 9);
      promocode += String(randomIndex)
    }
    const user = await this.prisma.user.findFirst({
      where: {
        idUser: idUser,
      },
    });

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        promocode: promocode,
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
