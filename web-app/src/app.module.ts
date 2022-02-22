import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameModule } from './games/games.module';
import { UserModule } from './users/users.module';
import { GamesModule } from './localplay/games/localplay.games.module';

@Module({
  imports: [
    GameModule,
    UserModule,
    GamesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
