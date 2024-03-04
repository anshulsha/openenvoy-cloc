import { Injectable } from '@nestjs/common';
import { LineCounter } from '../interfaces/line-counter.interface';
import { JavaLineClassifierService } from './line-classifier.service';

@Injectable()
export class JavaLineCounterService implements LineCounter {
  constructor(private readonly lineClassifier: JavaLineClassifierService) {}
  countLines(lines: string[]): {
    blankLines: number;
    commentLines: number;
    codeLines: number;
  } {
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
  }
}
