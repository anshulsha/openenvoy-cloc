import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PrintCounter {
  printResults(
    blankLines: number,
    commentLines: number,
    codeLines: number,
  ): void {
    try {
      const totalLines = blankLines + commentLines + codeLines;
      console.log(`Blank: ${blankLines}`);
      console.log(`Comments: ${commentLines}`);
      console.log(`Code: ${codeLines}`);
      console.log(`Total: ${totalLines}`);
    } catch (error) {
      Logger.error(
        `Error occurred while printing results: ${error.message}`,
        error.stack,
        'PrintCounter',
      );
    }
  }
}
