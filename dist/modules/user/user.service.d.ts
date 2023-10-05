import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getPromocode(idUser: any): Promise<any>;
    getProfile(idUser: any): Promise<any>;
    setProfile(idUser: any, tariffPlan: any, time: any): Promise<any>;
    setAllDateProfile(idUser: any, data: any): Promise<any>;
    setTariffTemp(idUser: any, tariffPlan: any): Promise<any>;
    uploadPromocode(idUser: any, promocode: any): Promise<any>;
    getCheckUser(idUser: any): Promise<any>;
}
