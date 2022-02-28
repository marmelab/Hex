import { Module } from '@nestjs/common';
import { LocalGamesModuleController } from './localgames.controller';

@Module({
  controllers: [LocalGamesModuleController],
})
export class LocalGamesModule {}
