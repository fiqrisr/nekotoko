import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async Login(@Body() body: LoginDto) {
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
