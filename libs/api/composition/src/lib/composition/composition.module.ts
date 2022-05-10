import { Module } from '@nestjs/common';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { CompositionService } from './composition.service';

@Module({
  providers: [CompositionService],
  imports: [PrismaMonolithicModule],
  exports: [CompositionService],
})
export class CompositionModule {}
