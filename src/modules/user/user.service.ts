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
    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    });
    if(user.promocode == 'LOL') {
      return 'no'
    }
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
    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      },
      include: {
        channels: true,
        opts: true,
      }
    });
    const resp = {...user, userNumber: user.channels.length, optNumber: user.opts.length}
    return resp;
  }
  async setProfile(idUser: any, tariffPlan: any, time:any): Promise<any> {
    const currentDate = new Date();
    currentDate.setDate(Number(currentDate.getDate()) + 1 + Number(time));
    const monthNext = currentDate.getMonth() + 1
    const dateEnd = currentDate.getDate() + '.' + monthNext + '.' + currentDate.getFullYear()
    await this.prisma.user.update({
      where: {
        id: idUser,
      },
      data: {
        tariffPlan: tariffPlan,
        subscriptionEndDate: dateEnd
      },
    });

    return "ok";
  }

  async setAllDateProfile(idUser: any, data:any): Promise<any> {
    await this.prisma.user.update({
      where: {
        id: idUser,
      },
      data: data,
    });

    return "ok";
  }

  async setTariffTemp(idUser: any, tariffPlan: any): Promise<any> {
    await this.prisma.user.update({
      where: {
        id: idUser,
      },
      data: {
        tariffPlan_temp: tariffPlan,
      },
    });

    return "ok";
  }

  async uploadPromocode(idUser: any, promocode: any): Promise<any> {
    if (promocode === 'LOL') {
      return 'expired'
    }
    const user = await this.prisma.user.findFirst({
      where: {
        promocode: promocode,
      },
    });

    if(user) {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          promocode: 'LOL',
          totalEarned: user.totalEarned + 1
        }
      });

      await this.prisma.user.update({
        where: {
          id: idUser,
        },
        data: {
          discount: 20,
        },
      });
      return 'ok'
    }

    return "not-exist";
  }
  async getCheckUser(idUser: any): Promise<any> {
    const isUser = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    });
    if (isUser) {
      return 'exist';
    }
    return 'empty';
  }

  async optUser(idUser: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      },
      include: {
        opts: true,
      }
    });
    for(const opt of user.opts) {
      const usersOptInto = await this.prisma.optInto.findMany({
        where: {
          chanel: opt.chanel
        },
        include: {
          user: true,
        }
      })
      opt['users'] = usersOptInto
    }
    return user.opts;
  }

  async recommendationsProfile(idUser: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      },
      include: {
        RecommendationInto: true,
      }
    });
    return user.RecommendationInto;
  }

  async optProfile(idUser: any): Promise<any> {
    console.log('!!!!!')
    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      },
      include: {
        opt_into: true,
      }
    });
    return user.opt_into;
  }
}
