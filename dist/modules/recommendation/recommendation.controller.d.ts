import { RecommendationService } from './recommendation.service';
export declare class RecommendationController {
    private recommendationService;
    constructor(recommendationService: RecommendationService);
    recommendationCreate(res: any, body: any): Promise<any>;
    recommendationGet(res: any): Promise<any>;
    recommendationGetIndividual(res: any, idRecommendation: any): Promise<any>;
}
