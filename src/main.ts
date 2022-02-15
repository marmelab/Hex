import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { registerHandlebarsHelpers } from './handlebars/helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  registerHandlebarsHelpers();
  app.setViewEngine('hbs');
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
