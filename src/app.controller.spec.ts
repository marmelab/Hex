import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { parseGameStateFromMultilineString } from './common/utils';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the current game state from the file"', () => {
      expect(appController.getBoardStateFromFile().gameState).toEqual(
        parseGameStateFromMultilineString(`
        ⬢ ⬡ ⬢
         ⬡ ⬡ ⬡
          ⬡ ⬡ ⬡
                `),
      );
    });
  });
});
