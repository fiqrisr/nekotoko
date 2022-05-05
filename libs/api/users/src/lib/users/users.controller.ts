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
import { Prisma } from '@nekotoko/prisma/monolithic';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private userSelect = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    username: true,
    full_name: true,
    roles: true,
    created_at: true,
    updated_at: true,
  });

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: Prisma.UserCreateWithoutOrderInput) {
    const user = await this.usersService.create({
      data,
      select: this.userSelect,
    });

    return {
      message: 'Berhasil membuat user baru',
      result: {
        user,
      },
    };
  }

  @Get()
  async findMany() {
    const users = await this.usersService.findMany({
      select: this.userSelect,
    });

    return {
      message: 'Data semua user',
      result: {
        users,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne({
      where: {
        id,
      },
      select: this.userSelect,
    });

    if (!user) {
      throw new HttpException(
        {
          message: 'Data user tidak ditemukan',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      message: 'Data user',
      result: {
        user,
      },
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateWithoutOrderInput
  ) {
    const user = await this.usersService.update({
      where: {
        id,
      },
      data,
      select: this.userSelect,
    });

    if (!user) {
      throw new HttpException(
        {
          message: 'Data user tidak ditemukan',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      message: 'Berhasil mengubah data user',
      result: {
        user,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findOne({
      where: {
        id,
      },
      select: this.userSelect,
    });

    if (!user) {
      throw new HttpException(
        {
          message: 'Data user tidak ditemukan',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND
      );
    }

    await this.usersService.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Berhasil menghapus data user',
      result: null,
    };
  }
}
