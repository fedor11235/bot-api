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
}
