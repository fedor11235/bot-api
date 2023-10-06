import { PrismaService } from '../prisma/prisma.service';
export declare class ChanelService {
    private prisma;
    constructor(prisma: PrismaService);
    getChanels(username: any): Promise<any>;
    createChanelUser(idUser: any, idChanel: any, title: any, username: any): Promise<any>;
    getChanelsUser(idUser: any): Promise<any>;
    getChanelsCategories(idUser: any, categoryQuery: any, filter: any): Promise<any>;
    setCategoryChanel(idUser: any, category: any): Promise<any>;
    addChannelInCatalog(data: any): Promise<any>;
    parseFilter(name: any): "forwards_count" | "participants_count" | "avg_post_reach" | "daily_reach" | "ci_index";
    getUrlCategoryStat(username: any): Promise<unknown>;
    categoriesMap(name: any): "other" | "education" | "finance" | "health" | "news" | "tech" | "entertainment" | "psychology" | "video" | "author";
}
