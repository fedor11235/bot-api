import { PrismaService } from '../prisma/prisma.service';
export declare class FileService {
    private prisma;
    constructor(prisma: PrismaService);
    getFile(dataUser: any): Promise<any>;
    setFile(file: any): Promise<any>;
}
