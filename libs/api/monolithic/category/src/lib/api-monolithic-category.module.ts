import { Module } from '@nestjs/common';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [],
  imports: [PrismaMonolithicModule],
})
export class ApiMonolithicCategoryModule {}
