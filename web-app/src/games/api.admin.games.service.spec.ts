import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Game } from './game.entity';
import {
  ApiAdminGamesService,
  GamesFilter,
  GamesSortColumn,
} from './api.admin.games.service';

let mockedGame: Game;

const mockGamesRepository = {
  findOne: (_id: number): Promise<Game> => {
    return new Promise((resolve, _reject) => {
      resolve(mockedGame);
    });
  },
  save: (game: Game): Game => {
    return game;
  },
  create: (game: Game): Game => {
    return game;
  },
};

describe('ApiAdminGameService', () => {
  let gameService: ApiAdminGamesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ApiAdminGamesService,
        {
          provide: getRepositoryToken(Game),
          useValue: mockGamesRepository,
        },
      ],
    }).compile();

    gameService = app.get<ApiAdminGamesService>(ApiAdminGamesService);
  });

  describe('file', () => {
    it('should convert an array of sort columns to a typeorm order type"', () => {
      const sort: GamesSortColumn[] = [
        {
          column: 'createdAt',
          order: 'DESC',
        },
        {
          column: 'id',
          order: 'ASC',
        },
        {
          column: 'player2',
          order: 'DESC',
        },
      ];
      expect(gameService.convertToFindOptionsOrder(sort)).toEqual({
        createdAt: 'DESC',
        id: 'ASC',
        player2: 'DESC',
      });
    });

    it('should convert an array of filters to a typeorm where type"', () => {
      const filter: GamesFilter[] = [
        {
          column: 'player1',
          value: 17,
        },
        {
          column: 'status',
          value: 'ENDED',
        },
      ];
      expect(gameService.convertToFindOptionsWhere(filter)).toEqual({
        player1: 17,
        status: 'ENDED',
      });
    });
  });
});
