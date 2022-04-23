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
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserInput: Prisma.UserCreateWithoutOrderInput) {
    const user = await this.userService.create(createUserInput);
    return {
      message: 'Berhasil membuat user baru',
      result: {
        user,
      },
    };
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return {
      message: 'Data semua user',
      result: {
        users,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
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
    @Body() updateUserInput: Prisma.UserUpdateWithoutOrderInput
  ) {
    const user = await this.userService.update(id, updateUserInput);
    return {
      message: 'Berhasil mengubah data user',
      result: {
        user,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id).then(() => {
      return {
        message: 'Berhasil menghapus data user',
        result: null,
      };
    });
  }
}
