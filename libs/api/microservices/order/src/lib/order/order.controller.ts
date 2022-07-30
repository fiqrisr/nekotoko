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
  Inject,
} from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import orderId from 'order-id';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  Order,
  OrderDetail,
  Prisma,
  PrismaService,
  User,
} from '@nekotoko/db-order';
import { RabbitMQService } from '@nekotoko/rabbitmq';
import { RoleGuard, Role } from '@nekotoko/api/roles';
import { PageOptionsDto, PageMetaDto } from '@nekotoko/api/shared/dto';
import { paginateArray } from '@nekotoko/api/utils';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindManyOrderDto } from './dto/find-many-order.dto';
import { firstValueFrom } from 'rxjs';

dayjs.extend(utc);

@Controller('order')
export class OrderController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orderService: OrderService,
    private readonly rmqService: RabbitMQService,
    @Inject('PRODUCT') private readonly productClient: ClientProxy,
    @Inject('AUTH') private readonly authClient: ClientProxy
  ) {}

  @Post()
  @RoleGuard.Params(Role.USER)
  async create(@Body() data: CreateOrderDto) {
    try {
      const orderNumber = data.number
        ? data.number
        : orderId('nktk-pos').generate();

      const user = await this.prisma.user.findFirst({
        where: { id: data.user_id },
      });

      if (!user) {
        const newUser = await firstValueFrom(
          this.authClient.send('get-user', { userId: data.user_id })
        ).then((res) => res.user);

        await this.prisma.user.create({ data: { ...newUser } });
      }

      this.productClient.emit('order-created', data.order_details);

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
      const order = (await this.orderService.findOne({
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
              product_id: true,
            },
          },
        },
      })) as Order & { order_details: OrderDetail[] };

      const newOrderDetails = await Promise.all(
        order.order_details.map((od) => {
          return firstValueFrom(
            this.productClient.send('get-product-for-order', {
              productId: od.product_id,
            })
          ).then((res) => ({ ...od, product: res.product }));
        })
      );

      // trunk-ignore(eslint/@typescript-eslint/no-unused-vars)
      const { order_details: _, ...rest } = order;

      return {
        message: 'Data transaksi',
        result: {
          order: {
            ...rest,
            order_details: newOrderDetails,
          },
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

      this.productClient.emit('order-deleted', orderDetails);

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

  @EventPattern('user-updated')
  async handleUserUpdate(@Payload() user: User, @Ctx() context: RmqContext) {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
      },
    });

    this.rmqService.ack(context);
  }
}
