import { Injectable } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';
import { nanoid } from 'nanoid';
import { Prisma, PrismaService, Product } from '@nekotoko/db-product';
import { SupabaseService } from '@nekotoko/api/shared/supabase';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService
  ) {}

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

  async uploadImage(image: MemoryStoredFile) {
    try {
      const ext = image.originalName.split('.').pop();
      const newFilename = nanoid();

      return await this.supabase.upload({
        bucket: 'product-images',
        file: image.buffer,
        filename: `${newFilename}.${ext}`,
        contentType: image.mimetype,
        upsert: true,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
