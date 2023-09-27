import { PrismaService } from '../prisma/prisma.service';
export declare class OptService {
    private prisma;
    constructor(prisma: PrismaService);
    createOpt(idUser: any, chanel: any): Promise<any>;
    getOpt(idUser: any): Promise<any>;
    getOptCategories(idUser: any, category: any, filter: any): Promise<any>;
    setOpt(idUser: any, data: any): Promise<any>;
    getStatOpt(chanel: any): Promise<any>;
    parseFilter(name: any): "forwards_count" | "participants_count" | "avg_post_reach" | "daily_reach" | "ci_index";
}
