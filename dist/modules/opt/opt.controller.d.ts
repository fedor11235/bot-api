import { OptService } from './opt.service';
export declare class OptController {
    private modeService;
    constructor(modeService: OptService);
    createOpt(res: any, idUser: any, chanel: any): Promise<any>;
    getOpt(res: any, idUser: any): Promise<any>;
    getStatOpt(res: any, chanel: any): Promise<any>;
    getOptCategories(res: any, idUser: any, category: any, filter: any): Promise<any>;
    setOptInto(res: any, idUser: any, idOpt: any, isDel: any, payload: any): Promise<any>;
    setRecommendationInto(res: any, idUser: any, idOpt: any, isDel: any, payload: any): Promise<any>;
    getOptInto(res: any, idOpt: any): Promise<any>;
    setOpt(res: any, idUser: any, data: any): Promise<any>;
    optDelete(res: any, chanel: any): Promise<any>;
    getAllOpts(res: any): Promise<any>;
    optGetRequisites(res: any, channel: any): Promise<any>;
    optSetCheck(res: any, idUser: any, channel: any, check: any, checkPath: any): Promise<any>;
    optPostDelete(res: any, idUser: any, chennel: any, type: any, postNumber: any): Promise<any>;
    saveEditOptTemp(res: any, idUser: any, chanelEdit: any, postId: any, optType: any): Promise<any>;
    saveEditOptTempCheck(res: any, idUser: any, chanelEdit: any, optType: any): Promise<any>;
    postEditOptTemp(res: any, idUser: any, payload: any): Promise<any>;
    checkEditOptTemp(res: any, idUser: any, check: any, checkPath: any): Promise<any>;
    addNewPost(res: any, idUser: any, body: any): Promise<any>;
}
