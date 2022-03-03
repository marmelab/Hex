import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

export interface UserDataInjectedInRequestAfterAuth {
  id: number;
  username: string;
  admin: boolean;
}

export interface JWTPayload {
  username: string;
  sub: number;
  admin: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserDataInjectedInRequestAfterAuth> {
    const user = await this.usersService.login(username, pass);
    if (user) {
      const { password, lastSessionId, ...result } = user;
      return { ...result, admin: user.username === 'admin' };
    }
    return null;
  }

  async getToken(
    userId: number,
    username: string,
    admin?: boolean,
  ): Promise<{ access_token: string }> {
    const payload: JWTPayload = { username: username, sub: userId, admin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
