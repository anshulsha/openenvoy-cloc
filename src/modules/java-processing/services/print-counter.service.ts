import { Injectable } from '@nestjs/common';

@Injectable()
export class PrintCounter {
  printResults(
    blankLines: number,
    commentLines: number,
    codeLines: number,
  ): void {
    const totalLines = blankLines + commentLines + codeLines;
    console.log(`Blank: ${blankLines}`);
    console.log(`Comments: ${commentLines}`);
    console.log(`Code: ${codeLines}`);
    console.log(`Total: ${totalLines}`);
  }
}
