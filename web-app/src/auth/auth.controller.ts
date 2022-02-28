import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDataInjectedInRequestAfterAuth } from './auth.service';
import { LoginData } from 'src/users/api.users.controller';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(
    @Body() params: LoginData,
    @Request() req: { user: UserDataInjectedInRequestAfterAuth },
  ) {
    return this.authService.getToken(req.user.id, req.user.username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/test-jwt')
  async testJwt(@Request() req: { user: UserDataInjectedInRequestAfterAuth }) {
    return `You are authorized ${req.user.username}`;
  }
}
