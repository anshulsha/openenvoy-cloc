import { Injectable, Logger } from '@nestjs/common';
import { FileProcessorFactory } from './factory/factory-provider';

@Injectable()
export class AppService {
  constructor(private readonly fileProcessorFactory: FileProcessorFactory) {}

  processFile(filename: string) {
    try {
      const fileProcessor = this.fileProcessorFactory.create(filename);
      return fileProcessor.processFile(filename);
    } catch (error) {
      Logger.log(`Error occurred: ${error.message}`);
      return {
        statusCode: 400,
        message: error.message,
      };
    }
  }
}
