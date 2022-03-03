import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { SimpleJsonParsePipe } from './api.admin.games.pipes';
import {
  ApiAdminGamesService,
  GamesSearchParams,
} from './api.admin.games.service';
import { Game } from './game.entity';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('api/admin/games')
export class ApiAdminGamesController {
  constructor(private readonly gamesService: ApiAdminGamesService) {}

  @Roles('admin')
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Game> {
    const game = await this.gamesService.findOne(id);
    if (game === undefined) throw new NotFoundException();
    return game;
  }

  @Roles('admin')
  @Get()
  async findMany(
    @Query('s', new SimpleJsonParsePipe<GamesSearchParams>())
    searchParams?: GamesSearchParams,
  ): Promise<{ data: Game[]; total: number }> {
    return this.gamesService.findMany(searchParams);
  }

  @Roles('admin')
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    this.gamesService.deleteOne(id);
  }

  @Roles('admin')
  @Delete()
  deleteMany(@Query('ids', new SimpleJsonParsePipe<number[]>()) ids: number[]) {
    this.gamesService.deleteMany(ids);
  }
}
