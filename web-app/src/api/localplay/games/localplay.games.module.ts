import { Module } from '@nestjs/common';
import { LocalplayGamesController } from './localplay.games.controller';

@Module({
  controllers: [LocalplayGamesController],
})
export class LocalplayGamesModule { }
