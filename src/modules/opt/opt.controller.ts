import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  Req,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { OptService } from './opt.service';

@Controller('opt')
export class OptController {
  constructor(private modeService: OptService) {}

  @Get('create')
  async createOpt(
    @Res() res,
    @Query('idUser') idUser,
    @Query('chanel') chanel,
  ) {
    const status = await this.modeService.createOpt(idUser, chanel);
    return res.status(HttpStatus.OK).json(status);
  }

  @Get('get')
  async getOpt(@Res() res, @Query('idUser') idUser) {
    const opt = await this.modeService.getOpt(idUser);
    return res.status(HttpStatus.OK).json(opt);
  }

  @Post('set')
  async setOpt(@Res() res, @Query('idUser') idUser, @Body() data) {
    const opt = await this.modeService.setOpt(idUser, data);
    return res.status(HttpStatus.OK).json(opt);
  }
}
