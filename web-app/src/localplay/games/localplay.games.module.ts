import { Module } from '@nestjs/common';
import { GamesController } from './localplay.games.controller';

@Module({
  controllers: [GamesController],
})
export class GamesModule { }
