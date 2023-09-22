import { PrismaService } from '../prisma/prisma.service';
export declare class ChanelService {
    private prisma;
    constructor(prisma: PrismaService);
    getChanels(username: any): Promise<any>;
    createChanelUser(idUser: any, idChanel: any): Promise<any>;
    getChanelsUser(idUser: any): Promise<any>;
    parseFilter(name: any): "forwards_count" | "participants_count" | "avg_post_reach" | "daily_reach" | "ci_index";
    getChanelsCategories(idUser: any, categoryQuery: any, filter: any): Promise<any>;
}
