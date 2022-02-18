import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  Req,
} from '@nestjs/common';
import { AppService, GameAndStatus } from './app.service';
import { Request } from 'express';

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
  async createNewGame(@Body() gameParams: { size: number }, @Req() req: Request) {
    const newGameId = (await this.appService.createNewGame(gameParams.size, req.sessionID)).id;
    return { url: `/game/${newGameId}` };
  }

  @Get('game/:id/join')
  @Redirect('/')
  async joinGame(@Param('id') id: number, @Req() req: Request) {
    const gameId = (await this.appService.joinGame(id, req.sessionID)).id;
    return { url: `/game/${gameId}` };
  }

  @Get('game/:id')
  @Render('game')
  async getGame(@Param('id') id: number, @Req() req: Request): Promise<GameAndStatus> {
    console.debug(`req.sessionID=${req.sessionID}`);
    const game = await this.appService.findGameById(id);
    return this.appService.getGameAndStatus(game, req.sessionID);
  }

  @Post('game/:id')
  @Render('game')
  async postGame(
    @Param('id') id: number,
    @Body() gameParams: { x?: number; y?: number },
    @Req() req: Request
  ): Promise<GameAndStatus> {
    let game = await this.appService.findGameById(id);
    if (gameParams.x && gameParams.y) {
      game = await this.appService.updateGameState(game, {
        x: gameParams.x,
        y: gameParams.y,
      });
    }
    return this.appService.getGameAndStatus(game, req.sessionID);
  }

  @Get('gameFromConfigFile')
  @Redirect('/')
  async getGameFromFile(@Req() req: Request) {
    const newGameId = (await this.appService.createNewGameFromFile(req.sessionID)).id;
    return { url: `/game/${newGameId}` };
  }
}
