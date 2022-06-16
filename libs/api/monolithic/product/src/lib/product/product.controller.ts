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
import { FormDataRequest } from 'nestjs-form-data';
import { PrismaService, Product, Image } from '@nekotoko/prisma/monolithic';
import { ProductService } from '@nekotoko/api/product';
import { RoleGuard, Role } from '@nekotoko/api/roles';
import { PageOptionsDto, PageMetaDto } from '@nekotoko/api/shared/dto';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UploadImageDto } from './dto/upload-image.dto';

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
      const { image, product_compositions, ...rest } = data;
      const imageUrl = image ? image[0].response?.data?.url : null;

      const product = await this.productService.create({
        data: {
          ...rest,
          ...(image && {
            image: {
              create: {
                uid: image[0]?.uid,
                url: imageUrl,
                name: image[0]?.name,
                size: image[0]?.size,
                type: image[0]?.type,
              },
            },
          }),
          product_compositions: {
            create: [...product_compositions],
          },
        },
        include: {
          category: true,
          product_compositions: {
            include: {
              composition: true,
            },
          },
          image: true,
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
  async findMany(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('category') category: string,
    @Query('search') search: string
  ) {
    try {
      const products = await this.productService.findMany({
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        orderBy: {
          name: pageOptionsDto.order,
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          image: {
            select: {
              id: true,
              url: true,
            },
          },
        },
        where: {
          ...(category ? { category: { name: { equals: category } } } : {}),
          ...(search
            ? { name: { contains: search, mode: 'insensitive' } }
            : {}),
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
          image: true,
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

      const { image, ...rest } = product as Product & { image: Image };

      return {
        message: 'Data produk',
        result: {
          product: {
            ...rest,
            image: image ? [image] : null,
          },
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
    const { category_id, product_compositions, image, ...rest } = data;
    const imageUrl =
      image.length > 0
        ? image[0]?.url
          ? image[0]?.url
          : image[0]?.response?.data?.url
        : null;

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
          image: {
            ...(image.length > 0
              ? {
                  upsert: {
                    update: {
                      uid: image[0]?.uid,
                      url: imageUrl,
                      name: image[0]?.name,
                      size: image[0]?.size,
                      type: image[0]?.type,
                    },
                    create: {
                      uid: image[0]?.uid,
                      url: imageUrl,
                      name: image[0]?.name,
                      size: image[0]?.size,
                      type: image[0]?.type,
                    },
                  },
                }
              : { delete: true }),
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

      const image = this.prisma.image.delete({
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

      await this.prisma.$transaction([productComposition, image, product]);

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

  @Post('upload-image')
  @FormDataRequest()
  @RoleGuard.Params(Role.ADMIN)
  async uploadImage(@Body() uploadImageDto: UploadImageDto) {
    try {
      const url = await this.productService.uploadImage(uploadImageDto.image);

      return {
        message: 'Berhasil mengunggah gambar',
        result: {
          url,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal mengunggah gambar',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
