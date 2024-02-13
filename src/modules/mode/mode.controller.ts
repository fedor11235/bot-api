import { Controller, Get, Res, Req, Query, HttpStatus } from '@nestjs/common';
import { ModeService } from './mode.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('модуль для работы с режимами чата бота и пользователя, уродская логика, нужно удалить и использовать локальные состояния фрейма')
@Controller('mode')
export class ModeController {
  constructor(private modeService: ModeService) {}

  @Get('get')
  async getMode(@Res() res, @Query('idUser') idUser) {
    const mode = await this.modeService.getMode(idUser);
    return res.status(HttpStatus.OK).json(mode);
  }

  @Get('set')
  async setMode(@Res() res, @Query('idUser') idUser, @Query('mode') mode) {
    const status = await this.modeService.setMode(idUser, mode);
    return res.status(HttpStatus.OK).json(status);
  }
}
