import { Module } from '@nestjs/common';
import { PythonFileProcessorService } from './services/file-processor.service';
import { PrintCounter } from './services/print-counter.service';
import { PythonLineClassifierService } from './services/line-classifier.service';
import { PythonLineCounterService } from './services/line-counter.service';

@Module({
  providers: [
    PythonFileProcessorService,
    PrintCounter,
    PythonLineClassifierService,
    PythonLineCounterService,
  ],
  exports: [PythonFileProcessorService],
})
export class PythonFileProcessingModule {}
