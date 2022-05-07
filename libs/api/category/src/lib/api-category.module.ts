import { Module } from '@nestjs/common';

import { CategoryModule } from './category/category.module';

@Module({
  controllers: [],
  providers: [],
  exports: [CategoryModule],
  imports: [CategoryModule],
})
export class ApiCategoryModule {}
