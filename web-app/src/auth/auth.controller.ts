import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/test-jwt')
  async testJwt() {
    return "You are authorized.";
  }
}
