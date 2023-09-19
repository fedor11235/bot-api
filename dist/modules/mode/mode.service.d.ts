import { PrismaService } from '../prisma/prisma.service';
export declare class ModeService {
    private prisma;
    constructor(prisma: PrismaService);
    getMode(idUser: any): Promise<any>;
    setMode(idUser: any, mode: any): Promise<any>;
}
