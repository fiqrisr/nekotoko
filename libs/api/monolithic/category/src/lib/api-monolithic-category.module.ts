import { Module } from '@nestjs/common';
import { CategoryModule } from '@nekotoko/api/category';

import { CategoryController } from './category/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [],
  exports: [],
  imports: [CategoryModule],
})
export class ApiMonolithicCategoryModule {}
