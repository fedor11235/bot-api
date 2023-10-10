import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import { User, Prisma } from '@prisma/client';

const PATH_CHECKS = 'media/checks/';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}
  async getFile(dataUser: any): Promise<any> {
    return 'ok';
  }
  async setFile(file: any): Promise<any> {
    const filesProject = [];


    // const format = file.mimetype.split('/')[1];
    const format = file.originalname.split('.')[1];
    const imagesPathFileWrite =
    PATH_CHECKS + `${new Date().valueOf()}.${format}`;

    // fs.writeFileSync(imagesPathFileWrite, file.buffer);
    // const fileProject = await this.prisma.files.create({
    //   data: {
    //     path: imagesPathFileWrite,
    //     project_id: Number(projectId),
    //   },

    //   filesProject.push(fileProject);
    // }
    // return filesProject;
    return 'ok';
  }
}
