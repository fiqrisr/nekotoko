import {
  Injectable,
  ExecutionContext,
  Inject,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, tap } from 'rxjs';

import { IS_PUBLIC_KEY } from '../decorators/public-route.decorator';

@Injectable()
export class JwtAuthGuardMicroservices implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('AUTH') private authClient: ClientProxy
  ) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const authentication = this.getAuthentication(context);

    return this.authClient
      .send('validate_user', {
        authorization: authentication,
      })
      .pipe(
        tap((res) => this.addUser(res, context)),
        catchError(() => {
          throw new UnauthorizedException();
        })
      );
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication: string;

    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().authorization;
    } else if (context.getType() === 'http') {
      authentication = context.switchToHttp().getRequest()
        .headers.authorization;
    }

    if (!authentication) {
      throw new UnauthorizedException(
        'No value was provided for authentication'
      );
    }

    return authentication;
  }

  private addUser(user: unknown, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}
