import {
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('api/users')
export class ApiUsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('')
  async create(
    @Req() req: Request
  ): Promise<User> {
    const { username, password } = req.body;
    return this.usersService.create(username, password);
  }
}
