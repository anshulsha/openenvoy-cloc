import { Injectable, Logger } from '@nestjs/common';
import { PrintCounter } from './print-counter.service';
import { LanguageFileProcessor } from 'src/modules/common/abstract-classes/language-file-processor';
import { PythonLineCounterService } from './line-counter.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PythonFileProcessorService implements LanguageFileProcessor {
  constructor(
    private readonly printCounter: PrintCounter,
    private readonly pythonLineCounterService: PythonLineCounterService,
  ) {}

  processDirectory(directoryPath: string): void {
    try {
      const files = fs.readdirSync(directoryPath);
      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        if (fs.statSync(filePath).isDirectory()) {
          // If it's a directory, recursively call processDirectory
          this.processDirectory(filePath);
        } else if (filePath.endsWith('.python')) {
          // If it's a Python file, process it
          this.processFile(filePath);
        }
      }
    } catch (error) {
      Logger.error(
        `Error processing directory: ${directoryPath}`,
        error.stack,
        'PythonFileProcessorService',
      );
      throw error;
    }
  }

  processFile(filename: string): void {
    try {
      Logger.log(`Processing Python file: ${filename}`);
      const data = fs.readFileSync(filename, 'utf8');
      const lines = data.split('\n');
      const { blankLines, commentLines, codeLines } =
        this.pythonLineCounterService.countLines(lines);
      this.printCounter.printResults(blankLines, commentLines, codeLines);
    } catch (error) {
      Logger.error(
        `Error processing Python file: ${filename}`,
        error.stack,
        'PythonFileProcessorService',
      );
      throw error;
    }
  }
}
