import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { join } from 'path';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET (root) should render the board as stored in the config file`, () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(/<div class="cell" data-color="empty">/)
      .expect(/<div class="cell" data-color="black">/)
      .expect(/<div class="cell" data-color="white">/);
  });
});
