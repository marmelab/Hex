import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiAdminUsersService } from './api.admin.users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { ApiUsersController } from './api.users.controller';
import { ApiAdminUsersController } from './api.admin.users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, ApiAdminUsersService],
  exports: [UsersService],
  controllers: [ApiUsersController, ApiAdminUsersController],
})
export class UsersModule {}
