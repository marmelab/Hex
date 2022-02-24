import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { registerHandlebarsHelpers } from './handlebars/helpers';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  registerHandlebarsHelpers();
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:19006/'
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
