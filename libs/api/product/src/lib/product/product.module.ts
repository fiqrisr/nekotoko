import { Module } from '@nestjs/common';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';
import { ApiSharedSupabaseModule } from '@nekotoko/api/shared/supabase';

import { ProductService } from './product.service';

@Module({
  providers: [ProductService],
  exports: [ProductService],
  imports: [PrismaMonolithicModule, ApiSharedSupabaseModule],
})
export class ProductModule {}
