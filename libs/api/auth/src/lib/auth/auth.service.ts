import { Injectable, HttpException } from '@nestjs/common';
import { User } from '@nekotoko/prisma/monolithic';
import { UsersService } from '@nekotoko/api/users';
import { PasswordService } from '@nekotoko/api/password';

import { TokenService } from './token/token.service';
import { LoginDto } from './dto/login.dto';
import { UserPayload } from './payloads/user.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<Partial<User>> {
    const user = await this.usersService.findOne({
      where: {
        username,
      },
    });

    if (user && (await this.passwordService.compare(password, user.password))) {
      return {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        roles: user.roles,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    }

    return null;
  }
  async login(loginDto: LoginDto): Promise<UserPayload> {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new HttpException('Invalid username or password', 401);
    }

    const accessToken = await this.tokenService.createToken({
      id: user.id,
      username: user.username,
      password: loginDto.password,
      roles: user.roles,
    });

    return {
      accessToken,
      user,
    };
  }
}
