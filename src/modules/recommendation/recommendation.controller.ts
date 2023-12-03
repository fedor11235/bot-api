import { Controller, Get, Post, Res, Req, Query, Body, UseInterceptors, HttpStatus, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecommendationService } from './recommendation.service';

@Controller('recommendations')
export class RecommendationController {
  constructor(private recommendationService: RecommendationService) {}

  @UseInterceptors(FileInterceptor('formdata'))
  @Post('create')
  async recommendationCreate(@Res() res, @Body() body) {
    const result = await this.recommendationService.recommendationCreate(body);
    return res.status(HttpStatus.OK).json(result);
  }

  @UseInterceptors(FileInterceptor('formdata'))
  @Post('edit')
  async recommendationSet(@Res() res, @Body() body) {
    const result = await this.recommendationService.recommendationSet(body);
    return res.status(HttpStatus.OK).json(result);
  }


  @Get('get')
  async recommendationGet(@Res() res, @Query('isBot') isBot) {
    const result = await this.recommendationService.recommendationGet(isBot);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('delete-bot')
  async recommendationDeleteBot(@Res() res, @Query('id') id) {
    const result = await this.recommendationService.recommendationDeleteBot(id);
    return res.status(HttpStatus.OK).json(result);
  }


  @Get('individual')
  async recommendationGetIndividual(@Res() res, @Query("idRecommendation") idRecommendation) {
    const result = await this.recommendationService.recommendationGetIndividual(idRecommendation);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('into-channel')
  async recommendationGetIntoChannel(@Res() res, @Query("channel") channel) {
    const result = await this.recommendationService.recommendationGetIntoChannel(channel);
    return res.status(HttpStatus.OK).json(result);
  }

  @UseInterceptors(FileInterceptor('formdata'))
  @Delete('delete')
  async recommendationDelete(@Res() res, @Body() body) {
    const result = await this.recommendationService.recommendationDelete(body);
    return res.status(HttpStatus.OK).json(result);
  }

  @UseInterceptors(FileInterceptor('formdata'))
  @Get('requisites')
  async recommendationGetRequisites(@Res() res, @Query('username') username) {
    const result = await this.recommendationService.recommendationGetRequisites(username);
    return res.status(HttpStatus.OK).json(result);
  }

  @UseInterceptors(FileInterceptor('formdata'))
  @Get('set-check')
  async recommendationSetChek(@Res() res, @Query('idUser') idUser, @Query('chennel') chennel, @Query('check') check, @Query('checkPath') checkPath) {
    const result = await this.recommendationService.recommendationSetChek(idUser, chennel, check, checkPath);
    return res.status(HttpStatus.OK).json(result);
  }
}
