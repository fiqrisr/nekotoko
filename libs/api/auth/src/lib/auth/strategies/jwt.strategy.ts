import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@nekotoko/prisma/monolithic';
import { UserService } from '@nekotoko/api/user';

import { UserPayload } from '../payloads/user.payload';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: UserPayload): Promise<Partial<User>> {
    const { id } = payload;

    const user = await this.userService.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
