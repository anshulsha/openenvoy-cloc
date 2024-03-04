export abstract class LanguageFileProcessor {
  abstract processFile(filename: string): void;
  abstract processDirectory(directoryPath: string): void;
}
