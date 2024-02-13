import { Controller, Get, Res, Req, Query, HttpStatus, Post, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChanelService } from './chanel.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('модуль для работы с каналами')
@Controller('chanel')
export class ChanelController {
  constructor(private chanelService: ChanelService) {}

  @Get('get')
  async getChanels(@Res() res, @Query('username') username) {
    const chanels = await this.chanelService.getChanels(username);
    return res.status(HttpStatus.OK).json(chanels);
  }

  @Get('create')
  async createChanelUser(
    @Res() res,
    @Query('idUser') idUser,
    @Query('idChanel') idChanel,
    @Query('title') title,
    @Query('username') username,
  ) {
    const status = await this.chanelService.createChanelUser(idUser, idChanel, title, username);
    return res.status(HttpStatus.OK).json(status);
  }

  @Get('user')
  async getChanelsUser(@Res() res, @Query('idUser') idUser) {
    const chanels = await this.chanelService.getChanelsUser(idUser);
    return res.status(HttpStatus.OK).json(chanels);
  }

  @Get('categories')
  async getChanelsCategories(@Res() res, @Query('idUser') idUser, @Query('category') category, @Query('filter') filter) {
    const chanels = await this.chanelService.getChanelsCategories(idUser, category, filter);
    return res.status(HttpStatus.OK).json(chanels);
  }

  @Get('user/set-channel')
  async setCategoryChanel(@Res() res, @Query('idUser') idUser, @Query('category') category) {
    const chanels = await this.chanelService.setCategoryChanel(idUser, category);
    return res.status(HttpStatus.OK).json(chanels);
  }

  @UseInterceptors(FileInterceptor('formdata'))
  @Post('add-channel')
  async addChannelInCatalog(@Res() res, @Body() data) {
    const result = await this.chanelService.addChannelInCatalog(data);
    return res.status(HttpStatus.OK).json(result);
  }
}
