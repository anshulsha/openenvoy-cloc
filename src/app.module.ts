import { Module } from '@nestjs/common';
import { FileProcessorFactory } from './common/factory/factory-provider';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PythonFileProcessingModule } from './modules/python-processing/file-processing.module';
import { JavaFileProcessingModule } from './modules/java-processing/file-processing.module';

@Module({
  imports: [PythonFileProcessingModule, JavaFileProcessingModule],
  providers: [AppService, FileProcessorFactory],
  controllers: [AppController],
})
export class AppModule {}
