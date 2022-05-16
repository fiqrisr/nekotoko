import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '@nekotoko/prisma/monolithic';
import { ProductService } from '@nekotoko/api/product';
import { RoleGuard, Role } from '@nekotoko/api/roles';
import { PageOptionsDto, PageMetaDto } from '@nekotoko/api/shared/dto';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly prisma: PrismaService
  ) {}

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
          product_compositions: {
            include: {
              composition: true,
            },
          },
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
  async findMany(@Query() pageOptionsDto: PageOptionsDto) {
    try {
      const products = await this.productService.findMany({
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        orderBy: {
          name: pageOptionsDto.order,
        },
      });

      const meta = new PageMetaDto({
        itemCount: await this.prisma.product.count(),
        pageOptionsDto,
      });

      return {
        message: 'Data semua produk',
        result: {
          products,
          meta,
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
        include: {
          category: true,
          product_compositions: {
            include: {
              composition: true,
            },
          },
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
          product_compositions: {
            include: {
              composition: true,
            },
          },
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
      const productComposition = this.prisma.productComposition.deleteMany({
        where: {
          product_id: id,
        },
      });

      const product = this.prisma.product.delete({
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

      await this.prisma.$transaction([productComposition, product]);

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
