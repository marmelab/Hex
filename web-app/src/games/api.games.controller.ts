import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Param,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { Coordinates } from '../common/utils';
import { GamesService, GameAndStatus } from './games.service';
import { Game } from './game.entity';

@Controller('api/games')
export class ApiGamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Post('')
  async create(
    @Body() params: { size?: number },
    @Req() req: Request
  ): Promise<Game> {
    return await this.gamesService.createNewGame(params.size, req.sessionID);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Req() req: Request
  ): Promise<GameAndStatus> {
    const game = await this.gamesService.findGameById(id);
    if (game === undefined) throw new NotFoundException();
    return this.gamesService.getGameAndStatus(game, req.sessionID);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() params: { nextMove: Coordinates },
    @Req() req: Request
  ): Promise<GameAndStatus> {
    let game = await this.gamesService.findGameById(id);
    if (game === undefined) throw new NotFoundException();
    if (params.nextMove.x && params.nextMove.y) {
      game = await this.gamesService.updateGameState(game, {
        x: params.nextMove.x,
        y: params.nextMove.y,
      });
    }
    return this.gamesService.getGameAndStatus(game, req.sessionID);
  }

  @Get(':id/join')
  async joinGame(
    @Param('id') id: number,
    @Req() req: Request) {
    await this.gamesService.joinGame(id, req.sessionID);
  }
}
