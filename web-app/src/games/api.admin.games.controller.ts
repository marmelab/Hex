import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
  Query,
  Delete,
} from '@nestjs/common';
import { Game } from './game.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiAdminGamesService,
  GamesSearchParams,
} from './api.admin.games.service';
import { JsonPipe } from './api.admin.games.pipes';

@Controller('api/admin/games')
export class ApiAdminGamesController {
  constructor(private readonly gamesService: ApiAdminGamesService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Game> {
    const game = await this.gamesService.findOne(id);
    if (game === undefined) throw new NotFoundException();
    return game;
  }

  @Get()
  async findMany(
    @Query('s', new JsonPipe<GamesSearchParams>())
    searchParams?: GamesSearchParams,
  ): Promise<Game[]> {
    return this.gamesService.findMany(searchParams);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    this.gamesService.deleteOne(id);
  }

  @Delete()
  deleteMany(@Query('ids', new JsonPipe<number[]>()) ids: number[]) {
    this.gamesService.deleteMany(ids);
  }
}
