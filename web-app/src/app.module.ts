import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import { LocalplayGamesModule } from './api/localplay/games/localplay.games.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GamesModule,
    UsersModule,
    LocalplayGamesModule,
    AuthModule
  ],
  controllers: [AppController],
})
export class AppModule { }
