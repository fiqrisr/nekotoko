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
import * as math from 'mathjs';
import { Prisma, PrismaService } from '@nekotoko/db-monolithic';
import { RoleGuard, Role } from '@nekotoko/api/roles';
import { PageOptionsDto, PageMetaDto } from '@nekotoko/api/shared/dto';

import { CompositionService } from './composition.service';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';

@Controller('composition')
export class CompositionController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly compositionService: CompositionService
  ) {}

  @Post()
  @RoleGuard.Params(Role.ADMIN)
  async create(@Body() data: CreateCompositionDto) {
    try {
      const composition = await this.compositionService.create({ data });

      return {
        message: 'Berhasil membuat komposisi baru',
        result: {
          composition,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal membuat komposisi baru',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  async findMany(@Query() pageOptionsDto: PageOptionsDto) {
    try {
      const compositions = await this.compositionService.findMany({
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        orderBy: {
          name: pageOptionsDto.order,
        },
      });

      const meta = new PageMetaDto({
        itemCount: await this.prisma.composition.count(),
        pageOptionsDto,
      });

      return {
        message: 'Data semua komposisi',
        result: {
          compositions,
          meta,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal mengambil data komposisi',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const composition = await this.compositionService.findOne({
        where: {
          id,
        },
      });

      if (!composition) {
        throw new HttpException(
          {
            message: 'Komposisi tidak ditemukan',
            error: 'Not Found',
          },
          HttpStatus.NOT_FOUND
        );
      }

      const { stock, ...rest } = composition;

      return {
        message: 'Data komposisi',
        result: {
          composition: {
            ...rest,
            stock: math.format(stock, { precision: 10 }),
          },
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal mengambil data komposisi',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(':id')
  @RoleGuard.Params(Role.ADMIN)
  async update(@Param('id') id: string, @Body() data: UpdateCompositionDto) {
    try {
      const composition = await this.compositionService.update({
        where: {
          id,
        },
        data,
      });

      if (!composition) {
        throw new HttpException(
          {
            message: 'Komposisi tidak ditemukan',
            error: 'Not Found',
          },
          HttpStatus.NOT_FOUND
        );
      }

      return {
        message: 'Berhasil mengubah komposisi',
        result: {
          composition,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal mengubah komposisi',
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
      const composition = await this.compositionService.delete({
        where: {
          id,
        },
      });

      if (!composition) {
        throw new HttpException(
          {
            message: 'Komposisi tidak ditemukan',
            error: 'Not Found',
          },
          HttpStatus.NOT_FOUND
        );
      }

      return {
        message: 'Berhasil menghapus komposisi',
        result: {
          composition,
        },
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new HttpException(
            {
              message: 'Gagal menghapus komposisi',
              error: 'Composition is used by some products',
            },
            HttpStatus.BAD_REQUEST
          );
        }
      }

      throw new HttpException(
        {
          message: 'Gagal menghapus komposisi',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
