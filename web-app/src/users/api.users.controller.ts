import {
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

export interface LoginData {
  username: string;
  password: string;
}

@Controller('api/users')
export class ApiUsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('')
  async create(
    @Body() params: LoginData
  ): Promise<User> {
    return this.usersService.create(params.username, params.password);
  }
}
