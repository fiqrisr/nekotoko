import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from '@nekotoko/api/prisma';

@Injectable()
export class UserService {
  constructor(protected readonly prisma: PrismaService) {}

  async create(createUserInput: Prisma.UserCreateWithoutOrderInput) {
    const password = await hash(createUserInput.password);
    return this.prisma.user.create({
      data: {
        ...createUserInput,
        role: ['user'],
        password,
      },
      select: {
        id: true,
        username: true,
        full_name: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        full_name: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        full_name: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  update(
    id: string,
    updateUserInput: Omit<Prisma.UserUpdateWithoutOrderInput, 'password'>
  ) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserInput,
      select: {
        id: true,
        username: true,
        full_name: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user
      .delete({
        where: { id },
        select: {
          id: true,
          username: true,
          full_name: true,
          role: true,
          created_at: true,
          updated_at: true,
        },
      })
      .then(() => ({
        message: 'Berhasil menghapus user',
      }));
  }
}
