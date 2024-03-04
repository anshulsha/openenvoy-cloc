import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PrintCounter {
  printResults(
    blankLines: number,
    commentLines: number,
    codeLines: number,
  ): void {
    try {
      const language = 'Python';
      const totalLines = blankLines + commentLines + codeLines;
      const padding = ' '.repeat(11 - language.length);
      console.log('----------------------------------------------');
      console.log(`Language${padding}${language}`);
      console.log('----------------------------------------------');
      console.log(`Blank${' '.repeat(10 - 'Blank'.length)}: ${blankLines}`);
      console.log(
        `Comments${' '.repeat(10 - 'Comments'.length)}: ${commentLines}`,
      );
      console.log(`Code${' '.repeat(10 - 'Code'.length)}: ${codeLines}`);
      console.log(`Total${' '.repeat(10 - 'Total'.length)}: ${totalLines}`);
      console.log('----------------------------------------------');
    } catch (error) {
      Logger.error(
        `Error occurred while printing results: ${error.message}`,
        error.stack,
        'PrintCounter',
      );
      throw error;
    }
  }
}
