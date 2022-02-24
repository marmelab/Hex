
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | undefined> {
    console.log(username);
    const user = await this.usersRepository.findOne({
      where: { username: username }
    });
    return user;
  }

  async create(username: string, password: string): Promise<User> {
    const user = this.usersRepository.create({
      username: username,
      password: password
    });
    return await this.usersRepository.save(user)
  }
}
