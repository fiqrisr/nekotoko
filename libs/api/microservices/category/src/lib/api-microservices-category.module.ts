import { Module } from '@nestjs/common';
import { ApiCategoryModule } from '@nekotoko/api/category';
import { PrismaProductModule } from '@nekotoko/prisma/product-db';

import { CategoryController } from './category/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [],
  exports: [],
  imports: [ApiCategoryModule, PrismaProductModule],
})
export class ApiMicroservicesCategoryModule {}
