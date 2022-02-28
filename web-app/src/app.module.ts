import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import { LocalGamesModule } from './localgames/localgames.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GamesModule, UsersModule, LocalGamesModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
