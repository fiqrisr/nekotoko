import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '@nekotoko/api/auth-shared';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    const { accessToken, user } = await this.authService.login(body);

    return {
      message: 'Berhasil login',
      result: {
        accessToken,
        user,
      },
    };
  }
}
