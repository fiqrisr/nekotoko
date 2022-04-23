import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { Prisma, PrismaService } from '@nekotoko/prisma/monolithic';

@Injectable()
export class UserService {
  private userSelect: Prisma.UserSelect = {
    id: true,
    username: true,
    full_name: true,
    role: true,
    created_at: true,
    updated_at: true,
  };

  constructor(protected readonly prisma: PrismaService) {}

  async create(createUserInput: Prisma.UserCreateWithoutOrderInput) {
    const password = await hash(createUserInput.password);
    return this.prisma.user.create({
      data: {
        ...createUserInput,
        role: ['user'],
        password,
      },
      select: this.userSelect,
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
  }

  findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      select: this.userSelect,
    });
  }

  update(
    id: string,
    updateUserInput: Omit<Prisma.UserUpdateWithoutOrderInput, 'password'>
  ) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserInput,
      select: this.userSelect,
    });
  }

  async remove(id: string) {
    return this.prisma.user
      .delete({
        where: { id },
        select: this.userSelect,
      })
      .then(() => ({
        message: 'Berhasil menghapus user',
      }));
  }
}
