import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class RecommendationService {
  constructor(private prisma: PrismaService) {}
  async recommendationCreate(payload: any): Promise<any> {
    payload['number_posts'] = Number(payload['number_posts'])
    const recommendation = await this.prisma.recommendation.create({
      data: payload,
    });
    return recommendation
  }
  async recommendationCheckMark(idRecommendation:any, mark: string): Promise<any> {
    const markLocal = mark === 'enabled'? true: false
    const recommendation = await this.prisma.recommendationInto.update({
      where: {
        id: Number(idRecommendation)
      },
      data: {
        check_mark: markLocal
      },
    });
    return recommendation
  }

  async recommendationGet(isBot: any): Promise<any> {
    let recommendations = await this.prisma.recommendation.findMany();
    if (isBot === 'enable') {
      recommendations = recommendations.filter(recommendation => recommendation.view === true)
    }
    return recommendations
  }
  async recommendationSet(payload: any): Promise<any> {
    const { id } =  payload
    delete payload.id
    payload.number_posts = Number(payload.number_posts)
    payload.view = payload.view === 'true'? true: false
    const recommendation = await this.prisma.recommendation.update({
      where: {
        id: Number(id)
      },
      data: payload
    });
    return recommendation
  }

  async recommendationIntoEdit(payload:any): Promise<any> {
    const recommendation = await this.prisma.recommendationInto.update({
      where: {
        id: Number(payload.id)
      },
      data: {
        booking_date: payload.booking_date
      },
    });
    return recommendation
  }

  async recommendationDeleteBot(id: any): Promise<any> {
    await this.prisma.recommendation.update({
      where: {
        id: Number(id)
      },
      data: {
        view: false
      }
    });
    return "ok"
  }
  async recommendationGetIndividual(idRecommendation: any): Promise<any> {
    const recommendation = await this.prisma.recommendation.findUnique({
      where: {
        id: Number(idRecommendation)
      }
    });
    return recommendation
  }
  async recommendationGetIntoChannel(channel: any): Promise<any> {
    const recommendations = await this.prisma.recommendationInto.findMany({
      where: {
        chanel: channel
      },
      include: {
        user: true
      }
    });
    return recommendations
  }
  async recommendationDelete(data: any): Promise<any> {
    const idArray: number[] = Object.values(data).map((id) => Number(id))
    await this.prisma.recommendation.deleteMany({
      where: {
        id: {
          in: idArray
        }
      }
    })
    return 'ok'
  }

  async recommendationGetRequisites(username: any): Promise<any> {
    const recommendation = await this.prisma.recommendation.findFirst({
      where: {
        username: username
      }
    })
    return recommendation.requisites
  }

  async recommendationSetChek(idUser: any, chennel: any, check: any, checkPath: any): Promise<any> {
    const recommendation = await this.prisma.recommendationInto.findFirst({
      where: {
        idUser: idUser,
        chanel: chennel
      }
    })
    await this.prisma.recommendationInto.update({
      where: {
        id: recommendation.id,
      },
      data: {
        check: check,
        path_check: checkPath
      }
    })
    return 'ok'
  }
}
