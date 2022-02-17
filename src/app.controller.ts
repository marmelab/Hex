import { Controller, Get, Render, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GameState } from './common/gameState';
import { parseObjectFromEncodedQuerystring } from './common/utils';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHomePage() {}

  @Get('file')
  @Render('game')
  getBoardStateFromFile(
    @Query('x') x?: number,
    @Query('y') y?: number,
  ): { gameState: GameState } {
    const gameState = this.appService.getBoardStateFromFile();
    const nextGameState =
      x && y ? this.appService.updateGameState(gameState, { x, y }) : gameState;
    return { gameState: nextGameState };
  }

  @Get('game')
  @Render('game')
  getBoard(
    @Query('gameState') playerGameState?: string,
    @Query('x') x?: number,
    @Query('y') y?: number,
  ): { gameState: GameState } {
    const gameState = playerGameState
      ? (parseObjectFromEncodedQuerystring(playerGameState) as GameState)
      : this.appService.initNewGameState(11);
    const nextGameState =
      x && y ? this.appService.updateGameState(gameState, { x, y }) : gameState;
    return { gameState: nextGameState };
  }
}
