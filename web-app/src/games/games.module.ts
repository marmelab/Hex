import { Module } from '@nestjs/common';
import { GameController } from './games.controller';
import { GameService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { getConnectionOptions } from 'typeorm';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    TypeOrmModule.forFeature([Game, User]),
  ],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule { }
