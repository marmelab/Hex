import { Controller, Get, Render, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GameState } from './common/gameState';
import { ParseObjectFromEncodedQuerystring } from './common/utils';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('file')
  @Render('index')
  getBoardStateFromFile(
    @Query('x') x?: number,
    @Query('y') y?: number,
  ): { gameState: GameState } {
    let gameState = this.appService.getBoardStateFromFile();
    if (x && y) {
      gameState = this.appService.updateGameState(gameState, {
        x,
        y,
      });
    }
    return { gameState };
  }

  @Get()
  @Render('index')
  getBoard(
    @Query('gameState') playerGameState?: string,
    @Query('x') x?: number,
    @Query('y') y?: number,
  ): { gameState: GameState } {
    let gameState = playerGameState
      ? (parseObjectFromEncodedQuerystring(playerGameState) as GameState)
      : this.appService.initNewGameState(11);
    if (x && y) {
      gameState = this.appService.updateGameState(gameState, {
        x,
        y,
      });
    }
    return { gameState };
  }
}
