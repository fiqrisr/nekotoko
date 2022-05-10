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
import { CompositionService } from '@nekotoko/api/composition';
import { RoleGuard, Role } from '@nekotoko/api/roles';

import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';

@Controller('composition')
export class CompositionController {
  constructor(private readonly compositionService: CompositionService) {}

  @Post()
  @RoleGuard.Params(Role.ADMIN)
  async create(@Body() data: CreateCompositionDto) {
    const composition = await this.compositionService.create({ data });

    return {
      message: 'Berhasil membuat komposisi baru',
      result: {
        composition,
      },
    };
  }

  @Get()
  async findMany() {
    const compositions = await this.compositionService.findMany({});

    return {
      message: 'Data semua komposisi',
      result: {
        compositions,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
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

    return {
      message: 'Data komposisi',
      result: {
        composition,
      },
    };
  }

  @Patch(':id')
  @RoleGuard.Params(Role.ADMIN)
  async update(@Param('id') id: string, @Body() data: UpdateCompositionDto) {
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
  }

  @Delete(':id')
  @RoleGuard.Params(Role.ADMIN)
  async delete(@Param('id') id: string) {
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
  }
}
