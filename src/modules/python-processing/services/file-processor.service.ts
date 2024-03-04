import { Injectable, Logger } from '@nestjs/common';
import { PrintCounter } from './print-counter.service';
import { LanguageFileProcessor } from 'src/modules/common/abstract-classes/language-file-processor';
import { PythonLineCounterService } from './line-counter.service';
import * as fs from 'fs';

@Injectable()
export class PythonFileProcessorService implements LanguageFileProcessor {
  constructor(
    private readonly printCounter: PrintCounter,
    private readonly pythonLineCounterService: PythonLineCounterService,
  ) {}

  processFile(filename: string) {
    Logger.log(`Processing Python file ...`);
    const data = fs.readFileSync(filename, 'utf8');
    const lines = data.split('\n');
    const { blankLines, commentLines, codeLines } =
      this.pythonLineCounterService.countLines(lines);
    this.printCounter.printResults(blankLines, commentLines, codeLines);

    return {
      blankLines,
      commentLines,
      codeLines,
      totalLines: blankLines + commentLines + codeLines,
    };
  }
}
