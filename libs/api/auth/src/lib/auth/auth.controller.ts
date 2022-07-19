import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard, Public } from '@nekotoko/api/auth-shared';

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

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser() {
    return true;
  }
}
