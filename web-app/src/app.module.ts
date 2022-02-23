import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import { LocalplayGamesModule } from './api/localplay/games/localplay.games.module';

@Module({
  imports: [
    GamesModule,
    UsersModule,
    LocalplayGamesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
