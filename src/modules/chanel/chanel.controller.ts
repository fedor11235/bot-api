import { Controller, Get, Res, Req, Query, HttpStatus } from '@nestjs/common';
import { ChanelService } from './chanel.service';

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
  ) {
    const status = await this.chanelService.createChanelUser(idUser, idChanel);
    return res.status(HttpStatus.OK).json(status);
  }

  @Get('user')
  async getChanelsUser(@Res() res, @Query('idUser') idUser) {
    const chanels = await this.chanelService.getChanelsUser(idUser);
    return res.status(HttpStatus.OK).json(chanels);
  }

  @Get('categories')
  async getChanelsCategories(@Res() res, @Query('category') category) {
    const chanels = await this.chanelService.getChanelsCategories(category);
    return res.status(HttpStatus.OK).json(chanels);
  }
}
