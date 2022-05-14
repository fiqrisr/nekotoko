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
    try {
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
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal membuat produk baru',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  async findMany() {
    try {
      const products = await this.productService.findMany({});

      return {
        message: 'Data semua produk',
        result: {
          products,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal mengambil data produk',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
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
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal mengambil data produk',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(':id')
  @RoleGuard.Params(Role.ADMIN)
  async update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    const { category_id, product_compositions, ...rest } = data;

    try {
      const product = await this.productService.update({
        where: {
          id,
        },
        data: {
          ...rest,
          ...(category_id
            ? {
                category: {
                  connect: {
                    id: category_id,
                  },
                },
              }
            : {}),
          ...(product_compositions
            ? {
                product_compositions: {
                  deleteMany: {},
                  create: [...product_compositions],
                },
              }
            : {}),
        },
        include: {
          category: true,
          product_compositions: true,
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
        message: 'Berhasil mengubah produk',
        result: {
          product,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal mengupdate data produk',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  @RoleGuard.Params(Role.ADMIN)
  async delete(@Param('id') id: string) {
    try {
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
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal menghapus data produk',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
