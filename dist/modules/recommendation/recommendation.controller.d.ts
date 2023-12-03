import { RecommendationService } from './recommendation.service';
export declare class RecommendationController {
    private recommendationService;
    constructor(recommendationService: RecommendationService);
    recommendationCreate(res: any, body: any): Promise<any>;
    recommendationSet(res: any, body: any): Promise<any>;
    recommendationIntoEdit(res: any, body: any): Promise<any>;
    recommendationGet(res: any, isBot: any): Promise<any>;
    recommendationCheckMark(res: any, idRecommendation: any, mark: any): Promise<any>;
    recommendationDeleteBot(res: any, id: any): Promise<any>;
    recommendationGetIndividual(res: any, idRecommendation: any): Promise<any>;
    recommendationGetIntoChannel(res: any, channel: any): Promise<any>;
    recommendationDelete(res: any, body: any): Promise<any>;
    recommendationGetRequisites(res: any, username: any): Promise<any>;
    recommendationSetChek(res: any, idUser: any, chennel: any, check: any, checkPath: any): Promise<any>;
}
