import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Render,
  Req,
} from '@nestjs/common';
import { GamesService, GameAndDisplayStatus } from './games.service';
import { Request } from 'express';
import { Game } from './game.entity';
import { NextMoveHint } from 'src/common/gameState';

type GetGameResponse =
  | GameAndDisplayStatus
  | (GameAndDisplayStatus & NextMoveHint);

@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @Post('')
  @Redirect('/')
  async createNewGame(
    @Body()
    gameParams: { size?: number; fromFile?: boolean; soloMode?: boolean },
    @Req() req: Request,
  ) {
    let newGame: Game;
    if (gameParams.fromFile) {
      newGame = await this.gameService.createNewGameFromFile(
        req.sessionID,
        !!gameParams.soloMode,
      );
    } else {
      newGame = await this.gameService.createNewGame(
        gameParams.size,
        req.sessionID,
        !!gameParams.soloMode,
      );
    }
    return { url: `/games/${newGame.id}` };
  }

  @Get(':id/join')
  @Redirect('/')
  async joinGame(@Param('id') id: number, @Req() req: Request) {
    await this.gameService.joinGame(id, req.sessionID);
    return { url: `/games/${id}` };
  }

  @Get(':id')
  @Render('game')
  async getGame(
    @Param('id') id: number,
    @Query('hint') hint: boolean,
    @Req() req: Request,
  ): Promise<GetGameResponse> {
    const game = await this.gameService.findGameById(id);
    return {
      ...this.gameService.getGameAndDisplayStatus(game, req.sessionID),
      ...(hint && this.gameService.getNextMoveHint(game, req.sessionID)),
    };
  }

  @Post(':id')
  @Render('game')
  async postGame(
    @Param('id') id: number,
    @Body() gameParams: { x: number; y: number },
    @Req() req: Request,
  ): Promise<GameAndDisplayStatus> {
    let game = await this.gameService.findGameById(id);
    game = await this.gameService.handlePlayerMove(game, gameParams);
    return this.gameService.getGameAndDisplayStatus(game, req.sessionID);
  }
}
