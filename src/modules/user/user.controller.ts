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

  @Get('check')
  async getCheckUser(@Res() res, @Query('idUser') idUser) {
    const check = await this.userService.getCheckUser(idUser);
    return res.status(HttpStatus.OK).json(check);
  }
}
