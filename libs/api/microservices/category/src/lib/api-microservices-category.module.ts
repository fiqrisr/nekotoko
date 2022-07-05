import { Module } from '@nestjs/common';
import { PrismaProductModule } from '@nekotoko/db-product';

import { CategoryController } from './category/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [],
  exports: [],
  imports: [PrismaProductModule],
})
export class ApiMicroservicesCategoryModule {}
