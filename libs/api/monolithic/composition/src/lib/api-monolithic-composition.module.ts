import { Module } from '@nestjs/common';
import { ApiCompositionModule } from '@nekotoko/api/composition';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { CompositionController } from './composition/composition.controller';

@Module({
  controllers: [CompositionController],
  providers: [],
  exports: [],
  imports: [ApiCompositionModule, PrismaMonolithicModule],
})
export class ApiMonolithicCompositionModule {}
