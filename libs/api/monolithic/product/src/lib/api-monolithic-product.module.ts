import { Module } from '@nestjs/common';
import { ApiProductModule } from '@nekotoko/api/product';

import { ProductController } from './product/product.controller';

@Module({
  controllers: [ProductController],
  providers: [],
  exports: [],
  imports: [ApiProductModule],
})
export class ApiMonolithicProductModule {}
