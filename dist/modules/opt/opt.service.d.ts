import { PrismaService } from '../prisma/prisma.service';
export declare class OptService {
    private prisma;
    constructor(prisma: PrismaService);
    createOpt(idUser: any, chanel: any): Promise<any>;
    getOpt(idUser: any): Promise<any>;
    setOpt(idUser: any, data: any): Promise<any>;
}
