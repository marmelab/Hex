import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { Game } from './game.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiAdminGamesService } from './api.admin.games.service';

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
  async findMany(): Promise<Game[]> {
    return this.gamesService.findMany();
  }
}
