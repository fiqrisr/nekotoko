import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService, Category } from '@nekotoko/prisma/product-db';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create<T extends Prisma.CategoryCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CategoryCreateArgs>
  ): Promise<Category> {
    return this.prisma.category.create(args);
  }

  async findMany<T extends Prisma.CategoryFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CategoryFindManyArgs>
  ): Promise<Category[]> {
    return this.prisma.category.findMany(args);
  }

  async findOne<T extends Prisma.CategoryFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CategoryFindUniqueArgs>
  ): Promise<Category | null> {
    return this.prisma.category.findUnique(args);
  }

  async update<T extends Prisma.CategoryUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CategoryUpdateArgs>
  ): Promise<Category> {
    return this.prisma.category.update(args);
  }

  async delete<T extends Prisma.CategoryDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CategoryDeleteArgs>
  ): Promise<Category> {
    return this.prisma.category.delete(args);
  }
}
