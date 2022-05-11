import { Module } from '@nestjs/common';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { ProductService } from './product.service';

@Module({
  providers: [ProductService],
  exports: [ProductService],
  imports: [PrismaMonolithicModule],
})
export class ProductModule {}
