import { Module } from '@nestjs/common';

import { ProductModule } from './product/product.module';

@Module({
  controllers: [],
  providers: [],
  exports: [ProductModule],
  imports: [ProductModule],
})
export class ApiProductModule {}
