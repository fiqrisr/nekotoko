import { Module } from '@nestjs/common';
import { PrismaProductModule } from '@nekotoko/db-product';

import { CompositionController } from './composition/composition.controller';

@Module({
  controllers: [CompositionController],
  providers: [],
  exports: [],
  imports: [PrismaProductModule],
})
export class ApiMicroservicesCompositionModule {}
