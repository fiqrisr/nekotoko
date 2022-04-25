import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

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

    if (!message) {
      return response.status(statusCode).json({
        status,
        message: description,
      });
    }

    if (typeof message === 'object' && !Array.isArray(message)) {
      return response.status(statusCode).json({
        status,
        ...message,
      });
    }

    return response.status(statusCode).json({
      status,
      message,
    });
  }
}
