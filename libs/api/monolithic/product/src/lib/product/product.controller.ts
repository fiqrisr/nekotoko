import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from '@nekotoko/api/product';
import { RoleGuard, Role } from '@nekotoko/api/roles';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @RoleGuard.Params(Role.ADMIN)
  async create(@Body() data: CreateProductDto) {
    const product = await this.productService.create({
      data: {
        ...data,
        product_compositions: {
          create: [...data.product_compositions],
        },
      },
      include: {
        category: true,
        product_compositions: true,
      },
    });

    return {
      message: 'Berhasil membuat produk baru',
      result: {
        product,
      },
    };
  }

  @Get()
  async findMany() {
    const products = await this.productService.findMany({});

    return {
      message: 'Data semua produk',
      result: {
        products,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new HttpException(
        {
          message: 'Produk tidak ditemukan',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      message: 'Data produk',
      result: {
        product,
      },
    };
  }

  @Patch(':id')
  @RoleGuard.Params(Role.ADMIN)
  async update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    const product = await this.productService.update({
      where: {
        id,
      },
      data: {},
    });

    if (!product) {
      throw new HttpException(
        {
          message: 'Produk tidak ditemukan',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      message: 'Berhasil mengubah produk',
      result: {
        product,
      },
    };
  }

  @Delete(':id')
  @RoleGuard.Params(Role.ADMIN)
  async delete(@Param('id') id: string) {
    const product = await this.productService.delete({
      where: {
        id,
      },
    });

    if (!product) {
      throw new HttpException(
        {
          message: 'Produk tidak ditemukan',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      message: 'Berhasil menghapus produk',
      result: {
        product,
      },
    };
  }
}
