import { Injectable } from '@nestjs/common';
import { PythonFileProcessorService } from '../modules/python-processing/services/file-processor.service';

import { LanguageFileProcessor } from '../modules/common/abstract-classes/language-file-processor';
import { JavaFileProcessorService } from 'src/modules/java-processing/services/file-processor.service';

@Injectable()
export class FileProcessorFactory {
  private readonly processors: Map<string, LanguageFileProcessor>;

  constructor(
    private readonly pythonFileProcessorService: PythonFileProcessorService,
    private readonly javaFileProcessorService: JavaFileProcessorService,
  ) {
    this.processors = new Map<string, LanguageFileProcessor>([
      ['py', this.pythonFileProcessorService],
      ['java', this.javaFileProcessorService],
    ]);
  }

  create(filename: string): LanguageFileProcessor {
    const fileExtension = filename.split('.').pop()?.toLowerCase();
    const processor = this.processors.get(fileExtension);
    if (!processor) {
      throw new Error(`Unsupported file extension: ${fileExtension}`);
    }
    return processor;
  }
}
