import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { User } from '../users/user.entity';
import { parseGameStateFromMultilineString } from '../common/utils';
import { GameState } from 'src/common/gameState';
import { UsersService } from '../users/users.service';

let mockedGame: Game;
let mockedUser: User;

const mockGamesRepository = {
  findOne: (id: number): Promise<Game> => {
    return new Promise((resolve, reject) => {
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

const mockUsersRepository = {
  findOne: (id: number): Promise<User> => {
    return new Promise((resolve, reject) => {
      resolve(mockedUser);
    });
  },
  save: (user: User): User => {
    return user;
  },
  create: (user: User): User => {
    return user;
  },
};

function createGameEntityFromGameState(gameState: GameState): Game {
  return {
    id: null,
    player1: null,
    player2: null,
    state: gameState,
    createdAt: null,
    updatedAt: null,
  };
}

function parseGameFromMultilineString(gameState: string): Game {
  return createGameEntityFromGameState(
    parseGameStateFromMultilineString(gameState),
  );
}

function createUser(userId: number, username: string): User {
  return {
    id: userId,
    username,
    password: '',
    lastSessionId: '',
    createdAt: undefined,
    updatedAt: undefined,
  };
}

describe('GameService', () => {
  let gameService: GamesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        UsersService,
        {
          provide: getRepositoryToken(Game),
          useValue: mockGamesRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    gameService = app.get<GamesService>(GamesService);
  });

  describe('file', () => {
    it('should return the current game state from the file"', () => {
      expect(gameService.getBoardStateFromFile()).toEqual(
        parseGameStateFromMultilineString(`
⬢ ⬡ ⬢
 ⬡ W ⬡
  ⬡ ⬡ ⬡
`),
      );
    });
    it('should throw an error if trying to set a stone in a already filled cell"', async () => {
      await expect(
        gameService.updateGameState(
          parseGameFromMultilineString(`
      ⬢ ⬡ ⬢
       ⬡ W ⬡
        ⬡ ⬡ ⬡
      `),
          { x: 1, y: 1 },
        ),
      ).rejects.toThrowError();
    });
  });
  it('should return the current game state from the file with still a black stone in [0,0]"', async () => {
    const game = parseGameFromMultilineString(`
    ⬡ ⬡ ⬢
     ⬡ W ⬡
      ⬡ ⬡ ⬡
    `);
    game.state.turn = 'black';
    expect(
      (await gameService.updateGameState(game, { x: 0, y: 0 })).state,
    ).toEqual(
      parseGameStateFromMultilineString(`
⬢ ⬡ ⬢
 ⬡ W ⬡
  ⬡ ⬡ ⬡
`),
    );
  });

  describe('root', () => {
    it('should return an empty board of 11x11"', async () => {
      expect(
        (await gameService.createNewGame(11, 'sessionID')).state.board,
      ).toEqual(
        parseGameStateFromMultilineString(`
⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
 ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
  ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
     ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
      ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
       ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
        ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
         ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
          ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
       `).board,
      );
    });
  });
  it('should return a board of 11x11 with a white stone in [1,1]"', async () => {
    expect(
      (
        await gameService.updateGameState(
          await gameService.createNewGame(11, 'sessionID'),
          {
            x: 1,
            y: 1,
          },
        )
      ).state.board,
    ).toEqual(
      parseGameStateFromMultilineString(`
⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
 ⬡ W ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
  ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
     ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
      ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
       ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
        ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
         ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
          ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
`).board,
    );
  });

  describe('getGameAndStatus', () => {
    it('should return "INITIALIZED" if there is only one player', () => {
      const game = createGameEntityFromGameState(
        parseGameStateFromMultilineString(`
⬢ ⬡ ⬢
 ⬡ W ⬡
  ⬡ ⬡ ⬡
       `),
      );
      game.player1 = createUser(1, 'player1');
      const playerName = 'white';

      const gameAndStatus = gameService.getGameAndStatus(game, playerName);

      expect(gameAndStatus.status).toEqual('INITIALIZED');
    });

    it('should return "RUNNING" if there are two players and the game is not won', () => {
      const game = createGameEntityFromGameState(
        parseGameStateFromMultilineString(`
⬢ ⬡ ⬢
 ⬡ W ⬡
  ⬡ ⬡ ⬡
       `),
      );
      game.player1 = createUser(1, 'player1');
      game.player2 = createUser(2, 'player2');
      const playerName = 'white';

      const gameAndStatus = gameService.getGameAndStatus(game, playerName);

      expect(gameAndStatus.status).toEqual('RUNNING');
    });

    it('should return "ENDED" if the game is won', () => {
      const game = createGameEntityFromGameState(
        parseGameStateFromMultilineString(`
⬢ ⬡ ⬢
 ⬡ W ⬡
  ⬡ ⬡ ⬡
       `),
      );
      game.player1 = createUser(1, 'player1');
      game.player2 = createUser(2, 'player2');
      game.state.winner = 'black';
      const playerName = 'white';

      const gameAndStatus = gameService.getGameAndStatus(game, playerName);

      expect(gameAndStatus.status).toEqual('ENDED');
    });
  });
});
