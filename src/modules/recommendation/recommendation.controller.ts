import { Controller, Get, Post, Res, Req, Query, Body, UseInterceptors, HttpStatus } from '@nestjs/common';
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

  @Get('get')
  async recommendationGet(@Res() res) {
    const result = await this.recommendationService.recommendationGet();
    console.log(result)
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
}
