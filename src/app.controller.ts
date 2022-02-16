import { Controller, Get, Param, Query, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { GameState } from './common/gameState';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getBoardStateFromFile(): { gameState: GameState } {
    return this.appService.getBoardStateFromFile();
  }

  @Get('createNewGame')
  @Redirect('/')
  async createNewGame(@Query('size') size: number) {
    const newGameId = await this.appService.createNewGame(size);
    return { url: `/game/${newGameId}` };
  }

  @Get('game/:id')
  async getGame(@Param('id') id: number): Promise<GameState> {
    const game = await this.appService.findGameById(id);
    return game.state;
  }
}
