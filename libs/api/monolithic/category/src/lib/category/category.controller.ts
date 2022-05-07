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
import { CategoryService } from '@nekotoko/api/category';
import { RoleGuard, Role } from '@nekotoko/api/roles';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @RoleGuard.Params(Role.ADMIN)
  async create(@Body() data: CreateCategoryDto) {
    const category = await this.categoryService.create({ data });

    return {
      message: 'Berhasil membuat kategori baru',
      result: {
        category,
      },
    };
  }

  @Get()
  async findMany() {
    const categories = await this.categoryService.findMany({});

    return {
      message: 'Data semua kategori',
      result: {
        categories,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new HttpException(
        {
          message: 'Kategori tidak ditemukan',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      message: 'Data kategori',
      result: {
        category,
      },
    };
  }

  @Get('/:id/products')
  async findOneWithProducts(@Param('id') id: string) {
    const category = await this.categoryService.findOne({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    return {
      message: 'Data kategori dengan produk',
      result: {
        category,
      },
    };
  }

  @Patch(':id')
  @RoleGuard.Params(Role.ADMIN)
  async update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    const category = await this.categoryService.update({
      where: {
        id,
      },
      data,
    });

    if (!category) {
      throw new HttpException(
        {
          message: 'Kategori tidak ditemukan',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      message: 'Berhasil mengubah kategori',
      result: {
        category,
      },
    };
  }

  @Delete(':id')
  @RoleGuard.Params(Role.ADMIN)
  async delete(@Param('id') id: string) {
    const category = await this.categoryService.delete({
      where: {
        id,
      },
    });

    if (!category) {
      throw new HttpException(
        {
          message: 'Kategori tidak ditemukan',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      message: 'Berhasil menghapus kategori',
      result: {
        category,
      },
    };
  }
}
