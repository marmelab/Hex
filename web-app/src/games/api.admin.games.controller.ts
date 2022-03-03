import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
  Delete,
} from '@nestjs/common';
import { Game } from './game.entity';
import {
  ApiAdminGamesService,
  GamesSearchParams,
} from './api.admin.games.service';
import { SimpleJsonParsePipe } from './api.admin.games.pipes';

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
    @Query('s', new SimpleJsonParsePipe<GamesSearchParams>())
    searchParams?: GamesSearchParams,
  ): Promise<{ data: Game[]; total: number }> {
    return this.gamesService.findMany(searchParams);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    this.gamesService.deleteOne(id);
  }

  @Delete()
  deleteMany(@Query('ids', new SimpleJsonParsePipe<number[]>()) ids: number[]) {
    this.gamesService.deleteMany(ids);
  }
}
