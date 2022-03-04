import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hash, compare } from 'bcryptjs';

export interface UserWithoutSensitiveData {
  id: number;
  username: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async login(username: string, password: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
      select: ['id', 'username', 'password'],
    });
    if (!user) return undefined;
    return (await compare(password, user.password)) ? user : undefined;
  }

  async create(
    username: string,
    pass: string,
  ): Promise<UserWithoutSensitiveData> {
    const user = this.usersRepository.create({
      username: username,
      password: await this.hashPassword(pass),
    });
    const { password, lastSessionId, ...result } =
      await this.usersRepository.save(user);
    return result;
  }

  async getOrCreate(username: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      username: username,
    });
    return existingUser
      ? existingUser
      : await this.usersRepository.save(
          this.usersRepository.create({
            lastSessionId: username,
            username: username,
            password: username,
          }),
        );
  }

  async incrementNbGames(userId: number): Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    if (user) {
    }
    user.nbGames += 1;
    await this.usersRepository.save(user);
  }
}
