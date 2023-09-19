import { Module } from '@nestjs/common';
import { ChanelController } from './chanel.controller';
import { ChanelService } from './chanel.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ChanelController],
  providers: [ChanelService, PrismaService],
})
export class ChanelModule {}
