import { Module } from '@nestjs/common';
import { DbProductModule } from '@nekotoko/db-product';

import { CompositionController } from './composition/composition.controller';
import { CompositionService } from './composition/composition.service';

@Module({
  controllers: [CompositionController],
  providers: [CompositionService],
  exports: [],
  imports: [DbProductModule],
})
export class ApiMicroservicesCompositionModule {}
