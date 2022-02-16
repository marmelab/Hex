import { Injectable } from '@nestjs/common';
import { parseGameStateFromFile } from './common/parseConfigFile';
import { join } from 'path';
import { GameState, updateGameState } from './common/gameState';
import { Coordinates } from './common/utils';

const configPathFromDistDir = '../gameStateFile.json';

@Injectable()
export class AppService {
  getBoardStateFromFile(): { gameState: GameState } {
    const gameState = parseGameStateFromFile(
      join(__dirname, configPathFromDistDir),
    );
    return { gameState };
  }

  updateGameState(
    gameState: GameState,
    coordinates: Coordinates,
  ): { gameState: GameState } {
    try {
      updateGameState(gameState, coordinates);
    } finally {
      return { gameState };
    }
  }
}
