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

  findGameById(id: number): Promise<Game> {
    return this.gamesRepository.findOne(id);
  }

  async createNewGame(size: number): Promise<number> {
    if (!size) {
      size = 5;
    } else {
      size = +size;
    }
    const game = await this.gamesRepository.save(this.gamesRepository.create({
      state: {
        turn: "white",
        board: new Array(size).fill(new Array(size).fill({ value: "empty" }))
      }
    }));
    return game.id;
  }
}
