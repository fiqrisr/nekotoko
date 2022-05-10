import { Module } from '@nestjs/common';
import { CompositionModule } from './composition/composition.module';

@Module({
  controllers: [],
  providers: [],
  exports: [CompositionModule],
  imports: [CompositionModule],
})
export class ApiCompositionModule {}
