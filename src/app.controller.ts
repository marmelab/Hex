import { Controller, Get, Render, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GameState } from './common/gameState';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getBoardStateFromFile(
    @Query('x') x?: number,
    @Query('y') y?: number,
  ): { gameState: GameState } {
    const getBoardStateFromFile = this.appService.getBoardStateFromFile();
    if (x && y) {
      return this.appService.updateGameState(getBoardStateFromFile.gameState, {
        x,
        y,
      });
    } else {
      return getBoardStateFromFile;
    }
  }
}
