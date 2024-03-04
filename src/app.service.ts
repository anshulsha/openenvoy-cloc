import { Injectable } from '@nestjs/common';
import { FileProcessorFactory } from './factory/factory-provider';

@Injectable()
export class AppService {
  constructor(private readonly fileProcessorFactory: FileProcessorFactory) {}

  processFile(filename: string) {
    const fileProcessor = this.fileProcessorFactory.create(filename);
    return fileProcessor.processFile(filename);
  }
}
