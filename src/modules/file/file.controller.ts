import type { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  StreamableFile,
  Param,
  Header,
  UseInterceptors,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { join } from 'path';
import { createReadStream } from 'fs';

const checksFolder = '/media/checks/'

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  // @Header('Content-Type', 'application/json')
  // @Header('Content-Disposition', 'attachment; filename="package.json"')
  // @Get('check/:name')
  // getFilePoster(
  //   @Res({ passthrough: true }) res: Response,
  //   @Param() params: any,
  // ): StreamableFile {
  //   const file = createReadStream(
  //     join(process.cwd() + checksFolder + params.name),
  //   );
  //   return new StreamableFile(file);
  // }


  // @UseInterceptors(AnyFilesInterceptor())
  // @Post('check')
  // setFile(
  //   @Res({ passthrough: true }) res: Response,
  //   @UploadedFile() file: any,
  // ) {
  //   console.log('file: ', file)
  //   // const file = createReadStream(
  //   //   join(process.cwd() + checksFolder + params.name),
  //   // );
  //   // return new StreamableFile(file);
  // }
}


