import { Module } from '@nestjs/common';

import { PrintCounter } from './services/print-counter.service';
import { JavaLineClassifierService } from './services/line-classifier.service';
import { JavaLineCounterService } from './services/line-counter.service';
import { JavaFileProcessorService } from './services/file-processor.service';

@Module({
  providers: [
    JavaFileProcessorService,
    PrintCounter,
    JavaLineClassifierService,
    JavaLineCounterService,
  ],
  exports: [JavaFileProcessorService],
})
export class JavaFileProcessingModule {}
