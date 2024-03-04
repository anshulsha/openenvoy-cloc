import { Injectable, Logger } from '@nestjs/common';
import { PythonLineClassifierService } from './line-classifier.service';
import { LineCounter } from '../interfaces/line-counter.interface';

@Injectable()
export class PythonLineCounterService implements LineCounter {
  constructor(private readonly lineClassifier: PythonLineClassifierService) {}
  countLines(lines: string[]): {
    blankLines: number;
    commentLines: number;
    codeLines: number;
  } {
    try {
      let blankLines = 0;
      let commentLines = 0;
      let codeLines = 0;

      for (const line of lines) {
        const lineType = this.lineClassifier.classifyLine(line);
        if (lineType === 'blank') {
          blankLines++;
        } else if (lineType === 'comment') {
          commentLines++;
        } else {
          codeLines++;
        }
      }

      return { blankLines, commentLines, codeLines };
    } catch (error) {
      Logger.error(
        `Error occurred in PythonLineCounterService: ${error.message}`,
        error.stack,
        'PythonLineCounterService',
      );
      throw error;
    }
  }
}
