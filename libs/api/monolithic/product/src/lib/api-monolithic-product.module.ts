import { Module } from '@nestjs/common';
import { ApiProductModule } from '@nekotoko/api/product';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { ProductController } from './product/product.controller';

@Module({
  controllers: [ProductController],
  providers: [],
  exports: [],
  imports: [ApiProductModule, PrismaMonolithicModule],
})
export class ApiMonolithicProductModule {}
