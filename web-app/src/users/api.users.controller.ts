import {
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('api/users')
export class ApiUsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('')
  async create(
    @Body() params: { username: string, password: string }
  ): Promise<User> {
    return this.usersService.create(params.username, params.password);
  }
}
