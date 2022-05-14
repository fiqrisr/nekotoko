import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload: {
    id: string;
    username: string;
    password: string;
    roles: string[];
  }) {
    if (!payload.username) return Promise.reject('Username is required');
    if (!payload.password) return Promise.reject('Password is required');

    return await this.jwtService.signAsync({
      sub: payload.id,
      username: payload.username,
      roles: payload.roles,
    });
  }
}
