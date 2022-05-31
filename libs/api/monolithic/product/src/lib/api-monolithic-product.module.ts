import { Module } from '@nestjs/common';
import { ApiProductModule } from '@nekotoko/api/product';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { ProductController } from './product/product.controller';

@Module({
  controllers: [ProductController],
  providers: [],
  exports: [],
  imports: [ApiProductModule, PrismaMonolithicModule, NestjsFormDataModule],
})
export class ApiMonolithicProductModule {}
