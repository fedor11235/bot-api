import { Controller, Get, Res, Req, Query, HttpStatus } from '@nestjs/common';
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
  async setProfile(@Res() res, @Query('idUser') idUser, @Query('tariffPlan') tariffPlan, @Query('time') time) {
    const status = await this.userService.setProfile(idUser, tariffPlan, time);
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

  @Get('check')
  async getCheckUser(@Res() res, @Query('idUser') idUser) {
    const check = await this.userService.getCheckUser(idUser);
    return res.status(HttpStatus.OK).json(check);
  }
}
