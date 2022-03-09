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
  Request,
} from '@nestjs/common';
import { Coordinates } from '../common/utils';
import { GamesService, GameAndDisplayStatus } from './games.service';
import { Game } from './game.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserDataInjectedInRequestAfterAuth } from 'src/auth/auth.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/games')
export class ApiGamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('')
  async create(
    @Body() params: { size?: number },
    @Request() req: { user: UserDataInjectedInRequestAfterAuth },
  ): Promise<Game> {
    return await this.gamesService.createNewGame(
      params.size,
      req.user.username,
      false,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Request() req: { user: UserDataInjectedInRequestAfterAuth },
  ): Promise<GameAndDisplayStatus> {
    const game = await this.gamesService.findGameById(id);
    if (game === undefined) throw new NotFoundException();
    return this.gamesService.getGameAndDisplayStatus(game, req.user.username);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() params: { nextMove: Coordinates },
    @Request() req: { user: UserDataInjectedInRequestAfterAuth },
  ): Promise<GameAndDisplayStatus> {
    let game = await this.gamesService.findGameById(id);
    if (game === undefined) throw new NotFoundException();
    game = await this.gamesService.applyMove(game, params.nextMove);
    return this.gamesService.getGameAndDisplayStatus(game, req.user.username);
  }

  @Get(':id/join')
  async joinGame(
    @Param('id') id: number,
    @Request() req: { user: UserDataInjectedInRequestAfterAuth },
  ): Promise<Game> {
    const game = await this.gamesService.findGameById(id);
    if (game === undefined) throw new NotFoundException();
    return await this.gamesService.joinGame(id, req.user.username);
  }
}
