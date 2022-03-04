import { Controller, Get, Query, UseGuards } from '@nestjs/common';
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
  constructor(private readonly gamesService: ApiAdminUsersService) {}

  @Roles('admin')
  @Get()
  async findMany(
    @Query('s', new SimpleJsonParsePipe<UsersSearchParams>())
    searchParams?: UsersSearchParams,
  ): Promise<{ data: User[]; total: number }> {
    return this.gamesService.findMany(searchParams);
  }
}
