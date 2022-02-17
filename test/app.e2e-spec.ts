import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { join } from 'path';
import { Game } from '../src/entities/game.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import {
  registerHandlebarsHelpers,
  unregisterHandlebarsHelpers,
} from '../src/handlebars/helpers';

let mockedGame: Game;

const mockRepository = {
  findOne: (id: number): Promise<Game> => {
    return new Promise((resolve, reject) => {
      resolve(mockedGame);
    })
  },
  save: (game: Game): Game => {
    return game;
  },
  create: (game: Game): Game => {
    return game;
  }
};

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Game),
          useValue: mockRepository
        }
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    registerHandlebarsHelpers();
    app.setViewEngine('hbs');
    await app.init();
  });

  afterAll(async () => {
    unregisterHandlebarsHelpers();
    await app.close();
  });

  it(`GET /gameFromConfigFile should redirect to a new game url`, () => {
    return request(app.getHttpServer())
      .get('/gameFromConfigFile')
      .expect(302);
  });
});

