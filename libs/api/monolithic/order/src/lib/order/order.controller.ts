import {
  Controller,
  Body,
  Get,
  Post,
  Query,
  Param,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import orderId from 'order-id';
import { unit } from 'mathjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Prisma, PrismaService } from '@nekotoko/db-monolithic';
import { RoleGuard, Role } from '@nekotoko/api/roles';
import { PageOptionsDto, PageMetaDto } from '@nekotoko/api/shared/dto';
import { paginateArray } from '@nekotoko/api/utils';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindManyOrderDto } from './dto/find-many-order.dto';

dayjs.extend(utc);

@Controller('order')
export class OrderController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orderService: OrderService
  ) {}

  @Post()
  @RoleGuard.Params(Role.USER)
  async create(@Body() data: CreateOrderDto) {
    try {
      const orderNumber = data.number
        ? data.number
        : orderId('nktk-pos').generate();

      const order = await this.orderService.create({
        data: {
          number: orderNumber,
          total_amount: data.total_amount,
          paid_amount: data.paid_amount,
          user_id: data.user_id,
          order_details: {
            create: [...data.order_details],
          },
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              full_name: true,
            },
          },
          order_details: true,
        },
      });

      data.order_details.forEach(async (o) => {
        const product = await this.prisma.product.findFirst({
          where: {
            id: o.product_id,
          },
          include: {
            product_compositions: {
              select: {
                id: true,
                quantity: true,
                unit: true,
                composition_id: true,
              },
            },
          },
        });

        product.product_compositions.forEach(async (p) => {
          const composition = await this.prisma.composition.findFirst({
            where: {
              id: p.composition_id,
            },
            select: {
              unit: true,
              stock: true,
            },
          });

          const amountToReduce = unit(p.quantity, p.unit).to(composition.unit);

          return await this.prisma.composition.update({
            where: {
              id: p.composition_id,
            },
            data: {
              stock: {
                decrement: amountToReduce.toNumber(),
              },
            },
          });
        });
      });

      return {
        message: 'Berhasil membuat transaksi baru',
        result: {
          order,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal membuat transaksi baru',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  @RoleGuard.Params(Role.ADMIN, Role.USER)
  async findMany(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() findManyOrderDto: FindManyOrderDto
  ) {
    try {
      if (
        findManyOrderDto.date ||
        (!findManyOrderDto.month && !findManyOrderDto.year)
      ) {
        const startOfDate = dayjs(findManyOrderDto.date || new Date())
          .utcOffset(7)
          .startOf('date')
          .toDate();
        const endOfDate = dayjs(findManyOrderDto.date || new Date())
          .utcOffset(7)
          .add(1, 'day')
          .startOf('date')
          .toDate();

        const whereFilter: Prisma.OrderFindManyArgs['where'] = {
          created_at: {
            gte: startOfDate,
            lt: endOfDate,
          },
        };

        const orders = await this.orderService.findMany({
          skip: pageOptionsDto.skip,
          take: pageOptionsDto.take,
          orderBy: {
            created_at: pageOptionsDto.order,
          },
          where: whereFilter,
          include: {
            user: {
              select: {
                id: true,
                username: true,
                full_name: true,
              },
            },
          },
        });

        const meta = new PageMetaDto({
          itemCount: await this.prisma.order.count({ where: whereFilter }),
          pageOptionsDto,
        });

        return {
          message: 'Data semua transaki',
          result: {
            orders,
            meta,
          },
        };
      } else if (findManyOrderDto.month && findManyOrderDto.year) {
        const totalDays = dayjs()
          .month(findManyOrderDto.month)
          .year(findManyOrderDto.year)
          .startOf('month')
          .daysInMonth();

        const orders = [];

        for (const d of Array.from(Array(totalDays).keys())) {
          const dateToFilter = dayjs()
            .year(findManyOrderDto.year)
            .month(findManyOrderDto.month)
            .startOf('month')
            .add(d, 'day');

          const startOfDay = dateToFilter.utcOffset(7).startOf('date').toDate();
          const endOfDay = dateToFilter
            .utcOffset(7)
            .startOf('date')
            .add(1, 'day')
            .toDate();

          const summary = await this.prisma.order.aggregate({
            where: {
              created_at: {
                gte: startOfDay,
                lt: endOfDay,
              },
            },
            _count: {
              number: true,
            },
            _sum: {
              total_amount: true,
            },
          });

          orders.push({
            date: dateToFilter,
            totalOrder: summary._count.number,
            totalAmount: summary._sum.total_amount || 0,
          });
        }

        const paginatedOrders = paginateArray(
          orders,
          pageOptionsDto.page,
          pageOptionsDto.take
        );

        const meta = new PageMetaDto({
          itemCount: totalDays,
          pageOptionsDto,
        });

        return {
          message: 'Data semua transaki',
          result: {
            orders: paginatedOrders,
            meta,
          },
        };
      } else if (findManyOrderDto.year && !findManyOrderDto.month) {
        const orders = [];

        for (const d of Array.from(Array(12).keys())) {
          const monthToFilter = dayjs()
            .year(findManyOrderDto.year)
            .month(d)
            .startOf('month');

          const startOfMonth = monthToFilter.toDate();
          const endOfMonth = monthToFilter.add(1, 'month').toDate();

          const summary = await this.prisma.order.aggregate({
            where: {
              created_at: {
                gte: startOfMonth,
                lt: endOfMonth,
              },
            },
            _count: {
              number: true,
            },
            _sum: {
              total_amount: true,
            },
          });

          orders.push({
            month: monthToFilter.format('MM-YYYY'),
            totalOrder: summary._count.number,
            totalAmount: summary._sum.total_amount || 0,
          });
        }

        const paginatedOrders = paginateArray(
          orders,
          pageOptionsDto.page,
          pageOptionsDto.take
        );

        const meta = new PageMetaDto({
          itemCount: 12,
          pageOptionsDto,
        });

        return {
          message: 'Data semua transaki',
          result: {
            orders: paginatedOrders,
            meta,
          },
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal mengambil data transaksi',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id')
  @RoleGuard.Params(Role.ADMIN, Role.USER)
  async findOne(@Param('id') id: string) {
    try {
      const order = await this.orderService.findOne({
        where: {
          id,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              full_name: true,
            },
          },
          order_details: {
            select: {
              id: true,
              quantity: true,
              total_price: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  image: {
                    select: {
                      url: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return {
        message: 'Data transaksi',
        result: {
          order,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal mengambil data transaksi',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  @RoleGuard.Params(Role.USER)
  async delete(@Param('id') id: string) {
    try {
      const orderDetails = await this.prisma.orderDetail.findMany({
        where: {
          order_id: id,
        },
      });

      orderDetails.forEach(async (o) => {
        const product = await this.prisma.product.findFirst({
          where: {
            id: o.product_id,
          },
          include: {
            product_compositions: {
              select: {
                id: true,
                quantity: true,
                unit: true,
                composition_id: true,
              },
            },
          },
        });

        product.product_compositions.forEach(async (p) => {
          const composition = await this.prisma.composition.findFirst({
            where: {
              id: p.composition_id,
            },
            select: {
              unit: true,
              stock: true,
            },
          });

          const amountToAdd = unit(p.quantity, p.unit).to(composition.unit);

          return await this.prisma.composition.update({
            where: {
              id: p.composition_id,
            },
            data: {
              stock: {
                increment: amountToAdd.toNumber(),
              },
            },
          });
        });
      });

      const orderToDelete = this.prisma.order.delete({
        where: {
          id,
        },
      });

      const orderDetailsToDelete = this.prisma.orderDetail.deleteMany({
        where: {
          order_id: id,
        },
      });

      await this.prisma.$transaction([orderDetailsToDelete, orderToDelete]);

      return {
        message: 'Berhasil menghapus transaksi',
        result: {
          deleted: true,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Gagal menghapus transaksi',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
