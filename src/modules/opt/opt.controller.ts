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
  Delete,
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

  // @Get('release-schedule')
  // async getReleaseSchedule(@Res() res, @Query('idUser') idUser) {
  //   const opts = await this.modeService.getReleaseSchedule(idUser);
  //   return res.status(HttpStatus.OK).json(opts);
  // }

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

  @Delete('opt-delete')
  async optDelete(@Res() res, @Query('chanel') chanel) {
    const opt = await this.modeService.optDelete(chanel);
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

  @Delete('post-delete')
  async optPostDelete(@Res() res, @Query('idUser') idUser, @Query('chennel') chennel, @Query('type') type, @Query('postNumber') postNumber) {
    const opt = await this.modeService.optPostDelete(idUser, chennel, type, postNumber);
    return res.status(HttpStatus.OK).json(opt);
  }

  @Get('post-save-temp')
  async saveEditOptTemp(@Res() res, @Query('idUser') idUser, @Query('chanelEdit') chanelEdit, @Query('postId') postId, @Query('optType') optType) {
    const opt = await this.modeService.saveEditOptTemp(idUser, chanelEdit, postId, optType);
    return res.status(HttpStatus.OK).json(opt);
  }

  @Get('check-save-temp')
  async saveEditOptTempCheck(@Res() res, @Query('idUser') idUser, @Query('chanelEdit') chanelEdit, @Query('optType') optType) {
    const opt = await this.modeService.saveEditOptTempCheck(idUser, chanelEdit, optType);
    return res.status(HttpStatus.OK).json(opt);
  }

  @Post('post-edit-temp')
  async postEditOptTemp(@Res() res, @Query('idUser') idUser, @Body() payload) {
    const opt = await this.modeService.postEditOptTemp(idUser, payload);
    return res.status(HttpStatus.OK).json(opt);
  }

  @Get('check-edit-temp')
  async checkEditOptTemp(@Res() res, @Query('idUser') idUser, @Query('check') check, @Query('checkPath') checkPath) {
    const opt = await this.modeService.checkEditOptTemp(idUser, check, checkPath);
    return res.status(HttpStatus.OK).json(opt);
  }

  @Post('add-new-post')
  async addNewPost(@Res() res, @Query('idUser') idUser, @Body() body) {
    const opt = await this.modeService.addNewPost(idUser, body);
    return res.status(HttpStatus.OK).json(opt);
  }
}
