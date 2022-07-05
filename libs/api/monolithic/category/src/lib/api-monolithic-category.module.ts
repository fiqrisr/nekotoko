import { Module } from '@nestjs/common';
import { DbMonolithicModule } from '@nekotoko/db-monolithic';

import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [],
  imports: [DbMonolithicModule],
})
export class ApiMonolithicCategoryModule {}
