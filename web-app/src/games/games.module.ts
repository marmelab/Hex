import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { getConnectionOptions } from 'typeorm';
import { User } from '../users/user.entity';
import { ApiGamesController } from './api.games.controller';
import { UsersModule } from 'src/users/users.module';
import { ApiAdminGamesService } from './api.admin.games.service';
import { ApiAdminGamesController } from './api.admin.games.controller';
import { GamesSubscriber } from './games.subscriber';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    TypeOrmModule.forFeature([Game, User]),
    UsersModule,
  ],
  controllers: [GamesController, ApiGamesController, ApiAdminGamesController],
  providers: [GamesService, ApiAdminGamesService, GamesSubscriber],
})
export class GamesModule {}
