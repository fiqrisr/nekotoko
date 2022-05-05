import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@nekotoko/prisma/monolithic';
import { UsersService } from '@nekotoko/api/users';

import { UserPayload } from '../payloads/user.payload';
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

  async validate(payload: UserPayload): Promise<Partial<User>> {
    const {
      user: { id },
    } = payload;

    const user = await this.usersService.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
