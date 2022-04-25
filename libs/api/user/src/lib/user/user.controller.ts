import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@nekotoko/prisma/monolithic';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private userSelect = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    username: true,
    full_name: true,
    roles: true,
    created_at: true,
    updated_at: true,
  });

  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: Prisma.UserCreateWithoutOrderInput) {
    const user = await this.userService.create({
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
    const users = await this.userService.findMany({
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
    const user = await this.userService.findOne({
      where: {
        id,
      },
    });

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
    const user = await this.userService.update({
      where: {
        id,
      },
      data,
      select: this.userSelect,
    });

    return {
      message: 'Berhasil mengubah data user',
      result: {
        user,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.delete({
      where: {
        id,
      },
      select: this.userSelect,
    });

    return {
      message: 'Berhasil menghapus data user',
      result: null,
    };
  }
}
