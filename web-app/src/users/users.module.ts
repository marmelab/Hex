import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { User } from '../users/user.entity';
import { ApiUsersController } from './api.users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [ApiUsersController],
})
export class UsersModule { }
