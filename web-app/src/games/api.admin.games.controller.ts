import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
  Delete,
  Query,
} from '@nestjs/common';
import { Game } from './game.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiAdminGamesService,
  GamesDeleteParams,
  GamesSearchParams,
} from './api.admin.games.service';
import {
  GamesDeleteParamsPipe,
  GamesSearchParamsPipe,
} from './api.admin.games.pipes';

@UseGuards(AuthGuard('jwt'))
@Controller('api/admin/games')
export class ApiAdminGamesController {
  constructor(private readonly gamesService: ApiAdminGamesService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Game> {
    const game = await this.gamesService.findOne(id);
    if (game === undefined) throw new NotFoundException();
    return game;
  }

  @Get('')
  async findMany(
    @Query('s', GamesSearchParamsPipe) searchParams?: GamesSearchParams,
  ): Promise<Game[]> {
    return this.gamesService.findMany(searchParams);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    this.gamesService.deleteOne(id);
  }

  @Delete('')
  deleteMany(
    @Query('d', GamesDeleteParamsPipe) deleteParams?: GamesDeleteParams,
  ) {
    this.gamesService.deleteMany(deleteParams);
  }
}
