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
      },
      include: {
        promocode: true
      }
    });
    if(user.promocode.length > 0) {
      return user.promocode[0].value
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

    await this.prisma.promocode.create({
      data: {
        owner_id: user.id,
        value: promocode
      },
    })
    
    return promocode;
  }

  async allowSuggestions(idUser: string, isSuggestion: string): Promise<any> {
    const isSuggestionLocal = isSuggestion === 'enabled'? true: false
    const users = await this.prisma.user.update({
      where: {
        id: idUser
      },
      data: {
        allow_suggestions: isSuggestionLocal
      }
    })
    return users
  }

  async getUserAll(): Promise<any> {
    const users = await this.prisma.user.findMany()
    return users
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
    if(user) {
      const resp = {...user, userNumber: user.channels.length, optNumber: user.opts.length}
      return resp;
    }
    return "no";
  }
  
  async setProfile(idUser: any, tariffPlan: any, time:any, isOne: any): Promise<any> {
    if(isOne === 'enabled') {
      const user = await this.prisma.user.findUnique({
        where: {
          id: idUser,
        },
      })
      if(user.used_command_business) {
        return "no"
      } else {
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
            subscriptionEndDate: dateEnd,
            used_command_business: true
          },
        });
    
        return "ok";
      }
    }
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

    const promocodeBd = await this.prisma.promocode.findFirst({
      where: {
        value: promocode,
      },
      include: {
        users_used: true,
        owner: true
      }
    });
    

    // если такого промокода не существует
    if(!promocodeBd) {
      return "not-exist";
    }

    const usersUsed = promocodeBd.users_used.find(user => user.id === idUser)

    // если пользователь уже ввел этот промокод
    if(usersUsed) {
      return 'expired'
    }

    // если вы владелец введенного промокода
    if(promocodeBd.owner_id === idUser) {
      return 'owner'
    }

    // добавляем юзера в массив введенных юзеров этот промокод
    const user = await this.prisma.user.update({
      where: {
        id: idUser,
      },
      data: {
        discount: promocodeBd.discount
      }
    })
    await this.prisma.user.update({
      where: {
        id: promocodeBd.owner.id,
      },
      data: {
        invitedUsers: promocodeBd.owner.invitedUsers + 1
      }
    })

    await this.prisma.promocode.update({
      where: {
        id: promocodeBd.id,
      },
      data: {
        users_used: {
          create: user
        }
      },
    });
    return 'ok'
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

  async recommendationsProfile(idUser: any, isBotProp:string): Promise<any> {
    const isBot = isBotProp === 'enabled'? true: false
    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      },
      include: {
        
        RecommendationInto: {
          include: {
            recommendation: true
          }
        }
      }
    });
    let recommendations = []

    for (const recommendationTemp of user.RecommendationInto) {
      const recommendation = await this.prisma.recommendation.findUnique({
        where: {
          username: recommendationTemp.chanel
        }
      });
      if(!isBot || recommendationTemp.view) {
        if(recommendation) {
          (recommendationTemp as any).title = recommendation.title;
          (recommendationTemp as any).opt = recommendation
          recommendations.push(recommendationTemp)
        }
      }
    }
    return recommendations;
  }

  async optProfile(idUser: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      },
      include: {
        opt_into: true
      }
    });
    let opts: any = []
    for (const optInto of user.opt_into) {
      const opt = await this.prisma.opt.findUnique({
        where: {
          chanel: optInto.chanel
        }
      });
      if(opt) {
        (optInto as any).title = opt.title;
        (optInto as any).opt = opt
        opts.push(optInto)
      }
    }
    return opts;
  }
}
