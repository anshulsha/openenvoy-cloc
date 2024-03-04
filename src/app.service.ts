import { Injectable, Logger } from '@nestjs/common';
import { FileProcessorFactory } from './common/factory/factory-provider';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  constructor(private readonly fileProcessorFactory: FileProcessorFactory) {}

  processFile(filename: string) {
    try {
      const fileProcessor = this.fileProcessorFactory.create(filename);
      return fileProcessor.processFile(filename);
    } catch (error) {
      Logger.log(`Error occurred: ${error.message}`);
    }
  }

  processDirectory(directoryPath: string) {
    try {
      const files = fs.readdirSync(directoryPath);
      const results = [];
      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        if (fs.statSync(filePath).isFile()) {
          results.push(this.processFile(filePath));
        } else if (fs.statSync(filePath).isDirectory()) {
          this.processDirectory(filePath);
        }
      }
      return results;
    } catch (error) {
      Logger.log(`Error occurred: ${error.message}`);
    }
  }
}
