import { Controller, Get, Res, Req, Post, Query, Body, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('promocode')
  async getPromocode(@Res() res, @Query('idUser') idUser) {
    const promocode = await this.userService.getPromocode(idUser);
    return res.status(HttpStatus.OK).json(promocode);
  }

  @Get('profile')
  async getProfile(@Res() res, @Query('idUser') idUser) {
    const profile = await this.userService.getProfile(idUser);
    return res.status(HttpStatus.OK).json(profile);
  }

  @Get('set')
  async setProfile(@Res() res, @Query('idUser') idUser, @Query('tariffPlan') tariffPlan, @Query('time') time, @Query('isOne') isOne) {
    const status = await this.userService.setProfile(idUser, tariffPlan, time, isOne);
    return res.status(HttpStatus.OK).json(status);
  }

  @Get('set/tariff-temp')
  async setTariffTemp(@Res() res, @Query('idUser') idUser, @Query('tariffPlan') tariffPlan) {
    const status = await this.userService.setTariffTemp(idUser, tariffPlan);
    return res.status(HttpStatus.OK).json(status);
  }

  @Get('upload/promocode')
  async uploadPromocode(@Res() res, @Query('idUser') idUser, @Query('promocode') promocode) {
    const status = await this.userService.uploadPromocode(idUser, promocode);
    return res.status(HttpStatus.OK).json(status);
  }

  @Post('set/profile')
  async setAllDateProfile(@Res() res, @Query('idUser') idUser, @Body() body) {
    const status = await this.userService.setAllDateProfile(idUser, body);
    return res.status(HttpStatus.OK).json(status);
  }

  @Get('check')
  async getCheckUser(@Res() res, @Query('idUser') idUser) {
    const check = await this.userService.getCheckUser(idUser);
    return res.status(HttpStatus.OK).json(check);
  }

  //в оптах в которых учавствуешь
  @Get('opt-into-user')
  async optProfile(@Res() res, @Query('idUser') idUser) {
    const status = await this.userService.optProfile(idUser);
    return res.status(HttpStatus.OK).json(status);
  } 

  //в подборках в которых учавствуешь
  @Get('recommendation-into-user')
  async recommendationsProfile(@Res() res, @Query('idUser') idUser) {
    const status = await this.userService.recommendationsProfile(idUser);
    return res.status(HttpStatus.OK).json(status);
  }

  //твои опты
  @Get('opt-user')
  async optUser(@Res() res, @Query('idUser') idUser) {
    const status = await this.userService.optUser(idUser);
    return res.status(HttpStatus.OK).json(status);
  }
}
