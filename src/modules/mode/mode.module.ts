import { Module } from '@nestjs/common';
import { ModeController } from './mode.controller';
import { ModeService } from './mode.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ModeController],
  providers: [ModeService, PrismaService],
})
export class ModeModule {}
