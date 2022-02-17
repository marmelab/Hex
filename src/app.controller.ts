import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Game } from './entities/game.entity';
import { GameState } from './common/gameState';
import { parseObjectFromEncodedQuerystring } from './common/utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('file')
  @Render('game')
  getBoardStateFromFile(
    @Query('x') x?: number,
    @Query('y') y?: number,
  ): { gameState: GameState } {
    const gameState = this.appService.getBoardStateFromFile();
    return x && y
      ? {
        gameState: this.appService.updateGameState(gameState, {
          x,
          y,
        }),
      }
      : { gameState };
  }

  @Get()
  @Render('index')
  getHomePage() {
    return "";
  }

  @Post('createNewGame')
  @Redirect('/')
  async createNewGame(@Body() gameParams: { size: number }) {
    const newGameId = await this.appService.createNewGame(gameParams.size);
    return { url: `/game/${newGameId}` };
  }

  @Get('game/:id')
  @Render('game')
  async getGame(@Param('id') id: number): Promise<Game> {
    return await this.appService.findGameById(id);
  }

  @Get('gameFromConfigFile')
  @Render('game')
  getGameFromFile(): Game {
    return {
      id: null,
      player1: null,
      player2: null,
      state: this.appService.getBoardStateFromFile()
    };
  }

  getBoard(
    @Query('gameState') playerGameState?: string,
    @Query('x') x?: number,
    @Query('y') y?: number,
  ): { gameState: GameState } {
    const gameState = playerGameState
      ? (parseObjectFromEncodedQuerystring(playerGameState) as GameState)
      : this.appService.initNewGameState(11);
    return x && y
      ? {
        gameState: this.appService.updateGameState(gameState, {
          x,
          y,
        }),
      }
      : { gameState };
  }
}
