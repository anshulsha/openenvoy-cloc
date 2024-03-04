export interface LineCounter {
  countLines(lines: string[]): {
    blankLines: number;
    commentLines: number;
    codeLines: number;
  };
}
