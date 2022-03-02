import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';

@Injectable()
export class ApiAdminGamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  findOne(id: number): Promise<Game> {
    return this.gamesRepository.findOne(id);
  }

  findMany(): Promise<Game[]> {
    return this.gamesRepository.find();
  }
}
