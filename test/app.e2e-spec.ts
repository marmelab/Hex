import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { join } from 'path';
import { registerHandlebarsHelpers, unregisterHandlebarsHelpers } from '../src/handlebars/helpers';
import { Game } from '../src/entities/game.entity';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../src/entities/user.entity';

const createTestConfiguration = (
  entities
): TypeOrmModuleOptions => ({
  type: 'sqlite',
  database: ':memory:',
  entities,
  dropSchema: true,
  synchronize: true,
  logging: false,
});

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot(createTestConfiguration([User, Game])),
        TypeOrmModule.forFeature([User, Game]),
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

  it(`GET /gameFromConfigFile should render the board as stored in the config file`, () => {
    return request(app.getHttpServer())
      .get('/gameFromConfigFile')
      .expect(200)
      .expect(/<div style="background: #eea">/)
      .expect(/<div style="background: black">/)
      .expect(/<div style="background: white">/);
  });
});

