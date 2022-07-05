import { Module } from '@nestjs/common';
import { DbMonolithicModule } from '@nekotoko/db-monolithic';

import { CompositionController } from './composition/composition.controller';
import { CompositionService } from './composition/composition.service';

@Module({
  controllers: [CompositionController],
  providers: [CompositionService],
  exports: [],
  imports: [DbMonolithicModule],
})
export class ApiMonolithicCompositionModule {}
