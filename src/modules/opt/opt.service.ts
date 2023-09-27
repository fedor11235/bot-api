import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OptService {
  constructor(private prisma: PrismaService) {}
  async createOpt(idUser: any, chanel: any): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { idUser: idUser },
    });
    const chanel_bd = await this.prisma.userChanel.findFirst({
      where: { idChanel: chanel },
    });
    await this.prisma.opt.deleteMany({
      where: { idUser: user.id },
    });
    const opt = await this.prisma.opt.create({
      data: {
        idUser: user.id,
        chanel: chanel,
        category: chanel_bd.category
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

  async getOptCategories(idUser:any, category: any, filter: any): Promise<any> {
    let opts
    
    if(filter && filter !== 'none') {
      const filterPrepar = this.parseFilter(filter)
      const user = await this.prisma.user.findFirst({
        where: {
          idUser: idUser
        },
      });
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          filter_opt: filterPrepar,
        },
      });
      const filterData = {[filterPrepar]: 'desc'}

      if (category === 'all') {
        opts = await this.prisma.opt.findMany({
          orderBy: [ filterData ],
        });
        return opts
      } else {
        opts = await this.prisma.opt.findMany({
          where: {
            category: category,
          },
          orderBy: [ filterData ],
        });
        return opts
      }
    }

    const user = await this.prisma.user.findFirst({
      where: {
        idUser: idUser
      },
    })

    if(user.filter_opt === "none") {
      if (category === 'all') {
        opts = await this.prisma.opt.findMany();
        return opts
      } else {
        opts = await this.prisma.opt.findMany({
          where: {
            category: category,
          },
        });
        return opts
      }
    }

    if (category === 'all') {
      opts = await this.prisma.catalog.findMany({
        orderBy: [ {[user.filter ]: 'desc'} ]
      });
    } else {
      opts = await this.prisma.catalog.findMany({
        where: {
          category: category,
        },
        orderBy: [ {[user.filter ]: 'desc'} ]
      });
    }
    return opts;
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

  async getStatOpt(chanel: any): Promise<any> {
    const opt = await this.prisma.opt.findFirst({
      where: { chanel: chanel }
    });

    const user = await this.prisma.user.findFirst({
      where: { id: opt.idUser }
    });

    const result = {...opt , user_id: user.idUser}
    return result;
  }

  parseFilter(name: any) {
    if(name === 'repost') {
      return 'forwards_count'
    } else if(name === 'numberSubscribers') {
      return 'participants_count'
    } else if(name === 'coveragePub') {
      return 'avg_post_reach'
    } else if(name === 'coverageDay') {
      return 'daily_reach'
    } else if(name === 'indexSay') {
      return 'ci_index'
    }
  }
}
