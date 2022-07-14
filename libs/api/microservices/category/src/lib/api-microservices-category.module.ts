import { Module } from '@nestjs/common';
import { DbProductModule } from '@nekotoko/db-product';

import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [],
  imports: [DbProductModule],
})
export class ApiMicroservicesCategoryModule {}
