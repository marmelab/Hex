import { Injectable } from '@nestjs/common';
import { parseGameStateFromFile } from './common/parseConfigFile';
import { join } from 'path';
import { GameState } from './common/gameState';

const configPathFromDistDir = '../gameStateFile.json';

@Injectable()
export class AppService {
  getBoardStateFromFile(): { gameState: GameState } {
    const gameState = parseGameStateFromFile(
      join(__dirname, configPathFromDistDir),
    );
    return { gameState };
  }
}
