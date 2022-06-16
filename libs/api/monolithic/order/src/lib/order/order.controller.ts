import {
  Controller,
  Body,
  Get,
  Post,
  Query,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import orderId from 'order-id';
import convert from 'convert';
import { Prisma, PrismaService } from '@nekotoko/prisma/monolithic';
import { OrderService } from '@nekotoko/api/order';
import { RoleGuard, Role } from '@nekotoko/api/roles';
import { PageOptionsDto, PageMetaDto } from '@nekotoko/api/shared/dto';

import { CreateOrderDto } from './dto/create-order.dto';

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
      const order = await this.orderService.create({
        data: {
          number: orderId('random').generate(),
          total_amount: data.total_amount,
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

      // data.order_details.forEach(async (o) => {
      //   const product = await this.prisma.product.findFirst({
      //     where: {
      //       id: o.product_id,
      //     },
      //     include: {
      //       product_compositions: {
      //         select: {
      //           id: true,
      //           quantity: true,
      //           unit: true,
      //           composition_id: true,
      //         },
      //       },
      //     },
      //   });

      //   product.product_compositions.forEach(async (p) => {
      //     const composition = await this.prisma.composition.findFirst({
      //       where: {
      //         id: p.composition_id,
      //       },
      //       select: {
      //         unit: true,
      //         stock: true,
      //       },
      //     });

      //     const amountToReduce = convert(p.quantity, 'g').to('kg');

      //     return await this.prisma.composition.update({
      //       where: {
      //         id: p.composition_id,
      //       },
      //       data: {
      //         stock: {
      //           decrement: amountToReduce,
      //         },
      //       },
      //     });
      //   });
      // });

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
  @RoleGuard.Params(Role.ADMIN)
  async findMany(@Query() pageOptionsDto: PageOptionsDto) {
    try {
      const orders = await this.orderService.findMany({
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        orderBy: {
          created_at: pageOptionsDto.order,
        },
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
        itemCount: await this.prisma.order.count(),
        pageOptionsDto,
      });

      return {
        message: 'Data semua transaki',
        result: {
          orders,
          meta,
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

  @Get(':id')
  @RoleGuard.Params(Role.ADMIN)
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
}
