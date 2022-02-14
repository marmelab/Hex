import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GameState } from './common/gameState';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getBoardStateFromFile(): { gameState: GameState } {
    return this.appService.getBoardStateFromFile();
  }
}
