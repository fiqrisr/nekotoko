import { Module } from '@nestjs/common';
import { ApiCompositionModule } from '@nekotoko/api/composition';

import { CompositionController } from './composition/composition.controller';

@Module({
  controllers: [CompositionController],
  providers: [],
  exports: [],
  imports: [ApiCompositionModule],
})
export class ApiMonolithicCompositionModule {}
