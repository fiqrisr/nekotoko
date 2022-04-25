import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(id: string, username: string, password: string) {
    if (!username) return Promise.reject('Username is required');
    if (!password) return Promise.reject('Password is required');

    return this.jwtService.signAsync({
      sub: id,
      username,
    });
  }
}
