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
  async recommendationGet(): Promise<any> {
    const recommendations = await this.prisma.recommendation.findMany();
    return recommendations
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
