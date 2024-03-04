import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('file-processing')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('file')
  processFile(@Query('filePath') filePath: string) {
    return this.appService.processFile(filePath);
  }

  @Get('directory')
  processDirectory(@Query('directoryPath') directoryPath: string) {
    return this.appService.processDirectory(directoryPath);
  }
}
