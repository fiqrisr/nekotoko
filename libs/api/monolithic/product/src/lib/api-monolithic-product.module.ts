import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { DbMonolithicModule } from '@nekotoko/db-monolithic';
import { ApiSharedSupabaseModule } from '@nekotoko/api/shared/supabase';

import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  exports: [],
  imports: [DbMonolithicModule, NestjsFormDataModule, ApiSharedSupabaseModule],
})
export class ApiMonolithicProductModule {}
