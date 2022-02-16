import { Injectable } from '@nestjs/common';
import { parseGameStateFromFile } from './common/parseConfigFile';
import { join } from 'path';
import { GameState, initNewGameState } from './common/gameState';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';

const configPathFromDistDir = '../gameStateFile.json';
const DEFAULT_BOARD_SIZE = 19;

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

  findGameById(id: number): Promise<Game> {
    return this.gamesRepository.findOne(id);
  }

  async createNewGame(size: number): Promise<number> {
    if (!size) {
      size = DEFAULT_BOARD_SIZE;
    } else {
      size = +size;
    }
    const game = await this.gamesRepository.save(this.gamesRepository.create({
      state: initNewGameState(size)
    }));
    return game.id;
  }
}
