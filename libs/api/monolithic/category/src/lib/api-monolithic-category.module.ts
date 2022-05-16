import { Module } from '@nestjs/common';
import { ApiCategoryModule } from '@nekotoko/api/category';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { CategoryController } from './category/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [],
  exports: [],
  imports: [ApiCategoryModule, PrismaMonolithicModule],
})
export class ApiMonolithicCategoryModule {}
