import { PrismaService } from '../prisma/prisma.service';
export declare class ChanelService {
    private prisma;
    constructor(prisma: PrismaService);
    getChanels(username: any): Promise<any>;
    createChanelUser(idUser: any, idChanel: any): Promise<any>;
    getChanelsUser(idUser: any): Promise<any>;
    getChanelsCategories(categoryQuery: any): Promise<any>;
}
