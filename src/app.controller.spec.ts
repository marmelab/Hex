import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { parseGameStateFromMultilineString } from './common/utils';
import { Game } from './entities/game.entity';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const mockRepository = () => { }; // TODO: complete mock if we need to mock repository functions

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Game),
          useValue: mockRepository
        }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the current game state from the file"', () => {
      expect(appController.getGameFromFile().state).toEqual(
        parseGameStateFromMultilineString(`
⬢ ⬡ ⬢
 ⬡ W ⬡
  ⬡ ⬡ ⬡
`),
      );
    });
  });
});
