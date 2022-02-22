import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { GamesModule } from './localplay/games/games.module';

@Module({
  imports: [
    GameModule,
    UserModule,
    GamesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
