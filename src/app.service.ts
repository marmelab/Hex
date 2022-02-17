import { Injectable } from '@nestjs/common';
import { parseGameStateFromFile } from './common/parseConfigFile';
import { join } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import {
  GameState,
  updateGameState,
  initNewGameState,
  DEFAULT_BOARD_SIZE,
} from './common/gameState';
import { Coordinates } from './common/utils';

const configPathFromDistDir = '../gameStateFile.json';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) { }

  getBoardStateFromFile(): GameState {
    const gameState = parseGameStateFromFile(
      join(__dirname, configPathFromDistDir),
    );
    return gameState;
  }

  updateGameState(gameState: GameState, coordinates: Coordinates): GameState {
    return updateGameState(gameState, coordinates);
  }

  initNewGameState(size?: number): GameState {
    return initNewGameState(size || DEFAULT_BOARD_SIZE);
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
