import { Controller, Post, Body } from '@nestjs/common';
import { UsersService, UserWithoutSensitiveData } from './users.service';

export interface LoginData {
  username: string;
  password: string;
}

@Controller('api/users')
export class ApiUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  async create(@Body() params: LoginData): Promise<UserWithoutSensitiveData> {
    return this.usersService.create(params.username, params.password);
  }
}
