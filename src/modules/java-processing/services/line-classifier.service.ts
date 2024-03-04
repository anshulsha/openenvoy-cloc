import { Injectable } from '@nestjs/common';
import { LineClassifier } from '../interfaces/line-classifier.interface';

@Injectable()
export class JavaLineClassifierService implements LineClassifier {
  private isInsideMultilineComment = false;

  classifyLine(line: string): 'blank' | 'comment' | 'code' {
    line = line.trim();

    if (!line) {
      return 'blank';
    }

    // Check for single-line comments
    if (line.startsWith('//')) {
      return 'comment';
    }

    // Check for start of multiline comment
    if (line.startsWith('/*')) {
      this.isInsideMultilineComment = true;
      // If it's the start of a multiline comment, treat the entire line as a comment
      return 'comment';
    }

    // Check for end of multiline comment
    if (line.endsWith('*/')) {
      this.isInsideMultilineComment = false;
      // If it's the end of a multiline comment, treat the entire line as a comment
      return 'comment';
    }

    // Check if inside a multiline comment
    if (this.isInsideMultilineComment) {
      return 'comment';
    }

    // If none of the above conditions are met, treat the line as code
    return 'code';
  }
}
