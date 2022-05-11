import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService, Product } from '@nekotoko/prisma/monolithic';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create<T extends Prisma.ProductCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProductCreateArgs>
  ): Promise<Product> {
    return this.prisma.product.create(args);
  }

  async findMany<T extends Prisma.ProductFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProductFindManyArgs>
  ): Promise<Product[]> {
    return this.prisma.product.findMany(args);
  }

  async findOne<T extends Prisma.ProductFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProductFindUniqueArgs>
  ): Promise<Product | null> {
    return this.prisma.product.findUnique(args);
  }

  async update<T extends Prisma.ProductUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProductUpdateArgs>
  ): Promise<Product> {
    return this.prisma.product.update(args);
  }

  async delete<T extends Prisma.ProductDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProductDeleteArgs>
  ): Promise<Product> {
    return this.prisma.product.delete(args);
  }
}
