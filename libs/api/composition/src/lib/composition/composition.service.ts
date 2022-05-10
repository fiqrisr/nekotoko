import { Injectable } from '@nestjs/common';
import {
  Prisma,
  PrismaService,
  Composition,
} from '@nekotoko/prisma/monolithic';

@Injectable()
export class CompositionService {
  constructor(private prisma: PrismaService) {}

  async create<T extends Prisma.CompositionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompositionCreateArgs>
  ): Promise<Composition> {
    return this.prisma.composition.create(args);
  }

  async findMany<T extends Prisma.CompositionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompositionFindManyArgs>
  ): Promise<Composition[]> {
    return this.prisma.composition.findMany(args);
  }

  async findOne<T extends Prisma.CompositionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompositionFindUniqueArgs>
  ): Promise<Composition | null> {
    return this.prisma.composition.findUnique(args);
  }

  async update<T extends Prisma.CompositionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompositionUpdateArgs>
  ): Promise<Composition> {
    return this.prisma.composition.update(args);
  }

  async delete<T extends Prisma.CompositionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompositionDeleteArgs>
  ): Promise<Composition> {
    return this.prisma.composition.delete(args);
  }
}
