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
    let status
    const isUserChanel = await this.prisma.userChanel.findFirst({
      where: {
        idUser: idUser,
        idChanel: idChanel,
      },
    });
    if (isUserChanel) {
      status = 'exist'
    } else {
      await this.prisma.userChanel.create({
        data: {
          idUser: idUser,
          idChanel: idChanel,
        },
      });
      const user = await this.prisma.user.findFirst({
        where: {
          idUser: idUser,
        },
      });
      if(!user) {
        await this.prisma.user.create({
          data: {
            idUser: idUser,
          },
        });
      }
      status = 'created'
    }
    return status;
  }
  async getChanelsUser(idUser: any): Promise<any> {
    const chanels = await this.prisma.userChanel.findMany({
      where: {
        idUser: idUser,
      },
    });
    return chanels;
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
  
  async getChanelsCategories(idUser: any, categoryQuery: any, filter: any): Promise<any> {
    let categoryFind;
    
    if(filter) {
      const filterPrepar = this.parseFilter(filter)
      const user = await this.prisma.user.findFirst({
        where: {
          idUser: idUser
        },
      });
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          filter: filterPrepar,
        },
      });
      const filterData = {[filterPrepar]: 'desc'}

      if (categoryQuery === 'all') {
        categoryFind = await this.prisma.catalog.findMany({
          orderBy: [ filterData ],
        });
      } else {
        categoryFind = await this.prisma.catalog.findMany({
          where: {
            category: categoryQuery,
          },
          orderBy: [ filterData ],
        });
      }
      return categoryFind;
    }

    const user = await this.prisma.user.findFirst({
      where: {
        idUser: idUser
      },
    })

    if(user.filter === "none") {
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

    if (categoryQuery === 'all') {
      categoryFind = await this.prisma.catalog.findMany({
        orderBy: [ {[user.filter ]: 'desc'} ]
      });
    } else {
      categoryFind = await this.prisma.catalog.findMany({
        where: {
          category: categoryQuery,
        },
        orderBy: [ {[user.filter ]: 'desc'} ]
      });
    }
    return categoryFind;
  }
}
