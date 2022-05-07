import { Module } from '@nestjs/common';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';
import { CategoryService } from './category.service';

@Module({
  providers: [CategoryService],
  imports: [PrismaMonolithicModule],
  exports: [CategoryService],
})
export class CategoryModule {}
