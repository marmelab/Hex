import { Injectable } from '@nestjs/common';
import { parseGameStateFromFile } from './common/parseConfigFile';
import { join } from 'path';
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
  getBoardStateFromFile(): GameState {
    const gameState = parseGameStateFromFile(
      join(__dirname, configPathFromDistDir),
    );
    return gameState;
  }

  updateGameState(gameState: GameState, coordinates: Coordinates): GameState {
    try {
      const updatedGameState = updateGameState(gameState, coordinates);
      return updatedGameState;
    } catch {
      return gameState;
    }
  }

  initNewGameState(size?: number): GameState {
    return initNewGameState(size || DEFAULT_BOARD_SIZE);
  }
}
