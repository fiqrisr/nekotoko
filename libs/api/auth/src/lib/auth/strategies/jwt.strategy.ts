import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@nekotoko/db-monolithic';
import { UsersService } from '@nekotoko/api/users';

import { JWT_SECRET_KEY } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly usersService: UsersService,
    protected readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_SECRET_KEY),
    });
  }

  async validate(payload: { sub: string }): Promise<Partial<User>> {
    const { sub } = payload;

    const user = await this.usersService.findOne({
      where: { id: sub },
      select: {
        id: true,
        username: true,
        full_name: true,
        roles: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
