import { Module } from '@nestjs/common';
import { ApiCategoryModule } from '@nekotoko/api/category';

import { CategoryController } from './category/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [],
  exports: [],
  imports: [ApiCategoryModule],
})
export class ApiMonolithicCategoryModule {}
