import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { SimpleJsonParsePipe } from '../nest-common/simpleJsonParse.pipes';
import {
  ApiAdminUsersService,
  UsersSearchParams,
} from './api.admin.users.service';
import { User } from './user.entity';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('api/admin/users')
export class ApiAdminUsersController {
  constructor(private readonly usersService: ApiAdminUsersService) {}

  @Roles('admin')
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (user === undefined) throw new NotFoundException();
    return user;
  }

  @Roles('admin')
  @Get()
  async findMany(
    @Query('s', new SimpleJsonParsePipe<UsersSearchParams>())
    searchParams?: UsersSearchParams,
  ): Promise<{ data: User[]; total: number }> {
    return this.usersService.findMany(searchParams);
  }
}
