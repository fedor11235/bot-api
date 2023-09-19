import { Module } from '@nestjs/common';
import { OptController } from './opt.controller';
import { OptService } from './opt.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [OptController],
  providers: [OptService, PrismaService],
})
export class OptModule {}
