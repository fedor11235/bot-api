import { Injectable } from '@nestjs/common';
import * as request from 'request';
import { PrismaService } from '../prisma/prisma.service';

const token = '746c997297440937501f953ec01c985f'


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
      const user = await this.prisma.user.findUnique({
        where: {
          id: idUser
        }
      });
      if(!user) {
        await this.prisma.user.create({
          data: {
            id: idUser,
          },
        });
      }
      const categoryStat: any = await this.getUrlCategoryStat(idChanel)
      if(categoryStat) {
        await this.prisma.userChanel.create({
          data: {
            idUser: idUser,
            idChanel: idChanel,

            category: "other",
            username: categoryStat.username,
            title: categoryStat.title,
            // link: chanel.link,
            daily_reach: categoryStat.daily_reach,
            ci_index: categoryStat.ci_index,
            participants_count: categoryStat.participants_count,
            avg_post_reach: categoryStat.avg_post_reach,
            forwards_count: categoryStat.forwards_count,
          },
        });
      } else {
        await this.prisma.userChanel.create({
          data: {
            idUser: idUser,
            idChanel: idChanel,
            category: "other"
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
  
  async getChanelsCategories(idUser: any, categoryQuery: any, filter: any): Promise<any> {
    let categoryFind;
    
    if(filter && filter !== 'none') {
      const filterPrepar = this.parseFilter(filter)
      const user = await this.prisma.user.findUnique({
        where: {
          id: idUser
        }
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
        return categoryFind;
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

    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    });

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

  getUrlCategoryStat(username) {
    return new Promise(function(resolve, reject) {
      const urlCategoryStat =  `https://api.tgstat.ru/channels/stat?token=${token}&channelId=${username}`
      request({url: urlCategoryStat, json: true}, async (error, response, data) => {
        const categoryStat = data.response;
        resolve(categoryStat)
      });
    });
  }

  categoriesMap (name) {
    if(name === 'education' || name === 'language' || name === 'edutainment' || name === 'art') {
      return 'education'
    } else if (name === 'economics' || name === 'business' || name === 'marketing') {
      return 'finance'
    } else if (name === 'medicine' || name === 'health') {
      return 'health'
    } else if (name === 'news' || name === 'politics') {
      return 'news'
    } else if (name === 'tech' || name === 'apps' || name === 'crypto') {
      return 'tech'
    } else if (name === 'entertainment') {
      return 'entertainment'
    } else if (name === 'psychology' || name === 'babies') {
      return 'psychology'
    } else if (name === 'video') {
      return 'video'
    } else if (name === 'blogs') {
      return 'author'
    } else if (name === 'sales' || name === 'other' || name === 'travels' || name === 'design') {
      return 'other'
    }
  }
}
