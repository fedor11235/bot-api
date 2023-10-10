import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  Req,
  Query,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Get('stat')
  async getStatOpt(@Res() res, @Query('chanel') chanel) {
    const opt = await this.modeService.getStatOpt(chanel);
    return res.status(HttpStatus.OK).json(opt);
  }

  @Get('categories')
  async getOptCategories(@Res() res, @Query('idUser') idUser, @Query('category') category, @Query('filter') filter) {
    const opt = await this.modeService.getOptCategories(idUser, category, filter);
    return res.status(HttpStatus.OK).json(opt);
  }

  @Post('into/set')
  async setOptInto(@Res() res, @Query('idUser') idUser, @Query('idOpt') idOpt, @Query('isDel') isDel, @Body() payload) {
    const opt = await this.modeService.setOptInto(idUser, idOpt, isDel, payload);
    return res.status(HttpStatus.OK).json(opt);
  }

  // @UseInterceptors(FileInterceptor('formdata'))
  @Post('into-recommendation/set')
  async setRecommendationInto(@Res() res, @Query('idUser') idUser, @Query('idOpt') idOpt, @Query('isDel') isDel, @Body() payload) {
    const opt = await this.modeService.setRecommendationInto(idUser, idOpt, isDel, payload);
    return res.status(HttpStatus.OK).json(opt);
  }

  @Get('into/get')
  async getOptInto(@Res() res, @Query('idOpt') idOpt) {
    const opt = await this.modeService.getOptInto(idOpt);
    return res.status(HttpStatus.OK).json(opt);
  }

  @Post('set')
  async setOpt(@Res() res, @Query('idUser') idUser, @Body() data) {
    const opt = await this.modeService.setOpt(idUser, data);
    return res.status(HttpStatus.OK).json(opt);
  }




  @Get('all')
  async getAllOpts(@Res() res) {
    const opt = await this.modeService.getAllOpts();
    return res.status(HttpStatus.OK).json(opt);
  }

  @Get('requisites')
  async optGetRequisites(@Res() res, @Query('channel') channel) {
    const opt = await this.modeService.optGetRequisites(channel);
    return res.status(HttpStatus.OK).json(opt);
  }

  @Get('set-check')
  async optSetCheck(@Res() res, @Query('idUser') idUser, @Query('channel') channel, @Query('check') check, @Query('checkPath') checkPath) {
    const opt = await this.modeService.optSetCheck(idUser, channel, check, checkPath);
    return res.status(HttpStatus.OK).json(opt);
  }
}
