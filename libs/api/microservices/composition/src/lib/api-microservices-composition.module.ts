import { Module } from '@nestjs/common';
import { ApiCompositionModule } from '@nekotoko/api/composition';
import { PrismaProductModule } from '@nekotoko/prisma/product-db';

import { CompositionController } from './composition/composition.controller';

@Module({
  controllers: [CompositionController],
  providers: [],
  exports: [],
  imports: [ApiCompositionModule, PrismaProductModule],
})
export class ApiMicroservicesCompositionModule {}
