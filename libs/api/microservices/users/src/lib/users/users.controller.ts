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
import { Prisma, PrismaService } from '@nekotoko/db-auth';
import { UsersService } from '@nekotoko/api/users';
import { RoleGuard, Role } from '@nekotoko/api/roles';
import { PageOptionsDto, PageMetaDto } from '@nekotoko/api/shared/dto';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
@RoleGuard.Params(Role.ADMIN)
export class UsersController {
  private userSelect = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    username: true,
    full_name: true,
    roles: true,
    created_at: true,
    updated_at: true,
  });

  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    try {
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
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal membuat user baru',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  async findMany(@Query() pageOptionsDto: PageOptionsDto) {
    try {
      const users = await this.usersService.findMany({
        select: this.userSelect,
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        orderBy: {
          username: pageOptionsDto.order,
        },
      });

      const meta = new PageMetaDto({
        itemCount: await this.prisma.user.count(),
        pageOptionsDto,
      });

      return {
        message: 'Data semua user',
        result: {
          users,
          meta,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Data user tidak ditemukan',
          error: error.message,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
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
    } catch (error) {
      throw new HttpException(
        {
          message: 'Data user tidak ditemukan',
          error: error.message,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    try {
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
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal mengubah data user',
          error: error.message,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const user = await this.usersService.delete({
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
        message: 'Berhasil menghapus data user',
        result: {
          user,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal menghapus data user',
          error: error.message,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }
}
