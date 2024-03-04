import { Injectable, Logger } from '@nestjs/common';
import { LineClassifier } from '../interfaces/line-classifier.interface';

@Injectable()
export class PythonLineClassifierService implements LineClassifier {
  private isInsideMultilineString = false;

  classifyLine(line: string): 'blank' | 'comment' | 'code' {
    try {
      line = line.trim();

      if (!line) {
        return 'blank';
      }

      // Python single-line comments start with '#' symbol
      if (line.startsWith('#')) {
        return 'comment';
      }

      // Python multiline strings start and end with triple quotes
      if (line.startsWith('"""') || line.startsWith("'''")) {
        // If it's the start of a multiline string, toggle the multilineString flag
        this.isInsideMultilineString = !this.isInsideMultilineString;
        return 'comment'; // Treat multiline strings as comments
      }

      // Check if inside a multiline string
      if (this.isInsideMultilineString) {
        return 'comment'; // If inside a multiline string, treat the line as a comment
      }

      // If none of the above conditions are met, treat the line as code
      return 'code';
    } catch (error) {
      Logger.error(
        `Error occurred in PythonLineClassifierService: ${error.message}`,
        error.stack,
        'PythonLineClassifierService',
      );
      throw error;
    }
  }
}
