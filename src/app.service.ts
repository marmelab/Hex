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
import { Coordinates, deepCloneObject } from './common/utils';

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

  async updateGameState(game: Game, coordinates: Coordinates): Promise<Game> {
    const updatedGame: Game = deepCloneObject(game);
    updatedGame.state = updateGameState(game.state, coordinates);
    await this.gamesRepository.save(updatedGame);
    return updatedGame;
  }

  initNewGameState(): GameState {
    return initNewGameState(DEFAULT_BOARD_SIZE);
  }

  findGameById(id: number): Promise<Game> {
    return this.gamesRepository.findOne(id);
  }

  async createNewGame(size: number): Promise<Game> {
    if (!size) {
      size = DEFAULT_BOARD_SIZE;
    } else {
      size = +size;
    }
    const game = await this.gamesRepository.save(this.gamesRepository.create({
      state: initNewGameState(size)
    }));
    return game;
  }

  async createNewGameFromFile(): Promise<Game> {
    let game = this.gamesRepository.create({
      state: this.getBoardStateFromFile()
    });
    game = await this.gamesRepository.save(game);
    return game;
  }
}
