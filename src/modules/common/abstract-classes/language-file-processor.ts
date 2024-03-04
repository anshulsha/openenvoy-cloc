export abstract class LanguageFileProcessor {
  abstract processFile(filename: string): {
    blankLines: number;
    commentLines: number;
    codeLines: number;
    totalLines: number;
  };
}
