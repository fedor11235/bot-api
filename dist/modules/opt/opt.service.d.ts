import { PrismaService } from '../prisma/prisma.service';
export declare class OptService {
    private prisma;
    constructor(prisma: PrismaService);
    createOpt(idUser: any, chanel: any): Promise<any>;
    getOpt(idUser: any): Promise<any>;
    getOptCategories(idUser: any, category: any, filter: any): Promise<any>;
    setOpt(idUser: any, data: any): Promise<any>;
    getStatOpt(chanel: any): Promise<any>;
    setOptInto(idUser: any, idOpt: any, isDel: any, body: any): Promise<any>;
    setRecommendationInto(idUser: any, idOpt: any, isDelete: any, body: any): Promise<any>;
    getOptInto(idOpt: any): Promise<any>;
    getAllOpts(): Promise<any>;
    optGetRequisites(channel: any): Promise<any>;
    optSetCheck(idUser: any, chennel: any, check: any, checkPath: any): Promise<any>;
    optPostDelete(idUser: any, chennel: any, type: any, postNumber: any): Promise<any>;
    saveEditOptTemp(idUser: any, chanelEdit: any, postId: any, optType: any): Promise<any>;
    saveEditOptTempCheck(idUser: any, chanelEdit: any, optType: any): Promise<any>;
    postEditOptTemp(idUser: any, post: any): Promise<any>;
    checkEditOptTemp(idUser: any, check: any, checkPath: any): Promise<any>;
    addNewPost(idUser: any, data: any): Promise<any>;
    parseFilter(name: any): "forwards_count" | "participants_count" | "avg_post_reach" | "daily_reach" | "ci_index";
}
