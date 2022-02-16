import { Injectable } from '@nestjs/common';
import { parseGameStateFromFile } from './common/parseConfigFile';
import { join } from 'path';
import { GameState } from './common/gameState';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';

const configPathFromDistDir = '../gameStateFile.json';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) { }

  getBoardStateFromFile(): { gameState: GameState } {
    const gameState = parseGameStateFromFile(
      join(__dirname, configPathFromDistDir),
    );
    return { gameState };
  }

  findGameById(id: string): Promise<Game> {
    return this.gamesRepository.findOne(id);
  }
}
