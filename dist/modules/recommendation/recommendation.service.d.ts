import { PrismaService } from '../prisma/prisma.service';
export declare class RecommendationService {
    private prisma;
    constructor(prisma: PrismaService);
    recommendationCreate(payload: any): Promise<any>;
    recommendationGet(): Promise<any>;
    recommendationGetIndividual(idRecommendation: any): Promise<any>;
}
