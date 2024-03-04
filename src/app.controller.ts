import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('file-processing')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':filePath')
  processFile(@Param('filePath') filePath: string) {
    return this.appService.processFile(filePath);
  }
}
