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
 ⬡ W ⬡
  ⬡ ⬡ ⬡
`),
      );
    });
    it('should return the current game state from the file + a white stone in [1,1]"', () => {
      expect(appController.getBoardStateFromFile(1, 1).gameState).toEqual(
        parseGameStateFromMultilineString(`
⬢ ⬡ ⬢
 ⬡ W ⬡
  ⬡ ⬡ ⬡
`),
      );
    });
  });
  it('should return the current game state from the file with still a black stone in [0,0]"', () => {
    expect(appController.getBoardStateFromFile(0, 0).gameState).toEqual(
      parseGameStateFromMultilineString(`
⬢ ⬡ ⬢
 ⬡ W ⬡
  ⬡ ⬡ ⬡
`),
    );
  });
});
