import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationError } from 'class-validator';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const status =
      exception instanceof ValidationError ||
      exception instanceof BadRequestException
        ? 'fail'
        : 'error';

    const message =
      exception instanceof HttpException ? exception.getResponse() : null;

    const description =
      exception instanceof HttpException ? exception.message : 'unknown';

    const baseResponse = {
      status,
      statusCode,
    };

    if (!message) {
      return httpAdapter.reply(
        ctx.getResponse(),
        {
          ...baseResponse,
          message: description,
        },
        statusCode
      );
    }

    if (typeof message === 'object' && !Array.isArray(message)) {
      return httpAdapter.reply(
        ctx.getResponse(),
        {
          ...baseResponse,
          ...message,
        },
        statusCode
      );
    }

    return httpAdapter.reply(
      ctx.getResponse(),
      {
        ...baseResponse,
        message,
      },
      statusCode
    );
  }
}
