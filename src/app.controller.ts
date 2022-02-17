import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Game } from './entities/game.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHomePage() {
    return '';
  }

  @Post('createNewGame')
  @Redirect('/')
  async createNewGame(@Body() gameParams: { size: number }) {
    const newGameId = (await this.appService.createNewGame(gameParams.size)).id;
    return { url: `/game/${newGameId}` };
  }

  @Get('game/:id')
  @Render('game')
  async getGame(@Param('id') id: number): Promise<Game> {
    let game = await this.appService.findGameById(id);
    return game;
  }

  @Post('game/:id')
  @Render('game')
  async postGame(
    @Param('id') id: number,
    @Body() gameParams: { x?: number; y?: number },
  ): Promise<Game> {
    let game = await this.appService.findGameById(id);
    if (gameParams.x && gameParams.y) {
      game = await this.appService.updateGameState(game, {
        x: gameParams.x,
        y: gameParams.y,
      });
    }
    return game;
  }

  @Get('gameFromConfigFile')
  @Redirect('/')
  async getGameFromFile() {
    const newGameId = (await this.appService.createNewGameFromFile()).id;
    return { url: `/game/${newGameId}` };
  }
}
