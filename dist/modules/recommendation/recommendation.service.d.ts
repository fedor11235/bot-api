import { PrismaService } from '../prisma/prisma.service';
export declare class RecommendationService {
    private prisma;
    constructor(prisma: PrismaService);
    recommendationCreate(payload: any): Promise<any>;
    recommendationGet(): Promise<any>;
    recommendationGetIndividual(idRecommendation: any): Promise<any>;
    recommendationGetIntoChannel(channel: any): Promise<any>;
    recommendationDelete(data: any): Promise<any>;
    recommendationGetRequisites(username: any): Promise<any>;
    recommendationSetChek(idUser: any, chennel: any, check: any): Promise<any>;
}
