import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Game } from './entities/game.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
      state: this.appService.getBoardStateFromFile().gameState
    };
  }
}
