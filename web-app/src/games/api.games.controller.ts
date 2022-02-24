import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Param,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { Coordinates } from '../common/utils';
import { GamesService, GameAndStatus } from './games.service';
import { Game } from './game.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/games')
export class ApiGamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Post('')
  async create(
    @Body() params: { size?: number },
    @Req() req: Request
  ): Promise<Game> {
    return await this.gamesService.createNewGame(params.size, req.user["username"]);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Req() req: Request
  ): Promise<GameAndStatus> {
    const game = await this.gamesService.findGameById(id);
    if (game === undefined) throw new NotFoundException();
    return this.gamesService.getGameAndStatus(game, req.user["username"]);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() params: { nextMove: Coordinates },
    @Req() req: Request
  ): Promise<GameAndStatus> {
    let game = await this.gamesService.findGameById(id);
    if (game === undefined) throw new NotFoundException();
    game = await this.gamesService.updateGameState(game, params.nextMove);
    return this.gamesService.getGameAndStatus(game, req.user["username"]);
  }

  @Get(':id/join')
  async joinGame(
    @Param('id') id: number,
    @Req() req: Request) {
    await this.gamesService.joinGame(id, req.user["username"]);
  }
}
