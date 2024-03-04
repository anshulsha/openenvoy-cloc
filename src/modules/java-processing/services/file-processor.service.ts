import { Injectable, Logger } from '@nestjs/common';
import { PrintCounter } from './print-counter.service';
import { LanguageFileProcessor } from 'src/modules/common/abstract-classes/language-file-processor';
import { JavaLineCounterService } from './line-counter.service';
import * as fs from 'fs';

@Injectable()
export class JavaFileProcessorService implements LanguageFileProcessor {
  constructor(
    private readonly printCounter: PrintCounter,
    private readonly javaLineCounterService: JavaLineCounterService,
  ) {}

  processFile(filename: string): {
    blankLines: number;
    commentLines: number;
    codeLines: number;
    totalLines: number;
  } {
    try {
      Logger.log(`Processing Java file: ${filename}`);
      const data = fs.readFileSync(filename, 'utf8');
      const lines = data.split('\n');
      const { blankLines, commentLines, codeLines } =
        this.javaLineCounterService.countLines(lines);
      this.printCounter.printResults(blankLines, commentLines, codeLines);

      return {
        blankLines,
        commentLines,
        codeLines,
        totalLines: blankLines + commentLines + codeLines,
      };
    } catch (error) {
      Logger.error(
        `Error processing Java file: ${filename}`,
        error.stack,
        'JavaFileProcessorService',
      );
      throw error;
    }
  }
}
