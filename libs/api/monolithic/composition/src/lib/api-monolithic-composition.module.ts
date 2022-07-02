import { Module } from '@nestjs/common';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { CompositionController } from './composition/composition.controller';
import { CompositionService } from './composition/composition.service';

@Module({
  controllers: [CompositionController],
  providers: [CompositionService],
  exports: [],
  imports: [PrismaMonolithicModule],
})
export class ApiMonolithicCompositionModule {}
