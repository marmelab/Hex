import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { join } from 'path';
import { Game } from '../src/games/game.entity';
import { User } from '../src/users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GamesController } from '../src/games/games.controller';
import { GamesService } from '../src/games/games.service';
import {
  registerHandlebarsHelpers,
  unregisterHandlebarsHelpers,
} from '../src/handlebars/helpers';
import session from 'express-session';
import { UsersService } from '../src/users/users.service';

let mockedGame: Game;
let mockedUser: User;

const mockGamesRepository = {
  findOne: (id: number): Promise<Game> => {
    return new Promise((resolve, reject) => {
      resolve(mockedGame);
    });
  },
  save: (game: Game): Game => {
    mockedGame = game;
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
    mockedUser = user;
    return user;
  },
  create: (user: User): User => {
    return user;
  },
};

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
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

    app = moduleFixture.createNestApplication();
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    registerHandlebarsHelpers();
    app.setViewEngine('hbs');
    app.use(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    unregisterHandlebarsHelpers();
    await app.close();
  });

  it(`POST /games with fromFile equals true should redirect to a new game url`, () => {
    return request(app.getHttpServer())
      .post('/games')
      .send({ fromFile: true })
      .expect(302);
  });

  it(`GET /games/1?hint=true should return I'm one move from winning`, async () => {
    const res = await request(app.getHttpServer())
      .get('/games/1?hint=true')
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.text).toMatch('ONE_MOVE_TO_WIN');
    expect(res.text).toMatch('Suggested next move: (1, 0)');
  });
});
