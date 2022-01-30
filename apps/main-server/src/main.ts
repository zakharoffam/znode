import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = await configService.get<string | number>('PORT');
  const sessionSecret = await configService.get<string>('SESSION_SECRET');
  const globalPrefix = 'api';

  // Инициализируем глобальный префикс для всех REST'ов
  app.setGlobalPrefix(globalPrefix);

  // Промежуточный обработчик сессий
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
    })
  );

  // Инициализируем глобальную валидацию всех входящих данных через DTO
  app.useGlobalPipes(new ValidationPipe());

  // Стартуем сервер
  await app.listen(port);
  Logger.log(`Сервер запущен: http://localhost:${port}/${globalPrefix}`);
}

bootstrap().catch((err) => {
  Logger.error(`При запуске сервера возникла ошибка:`, `main.boostrap()`);
  console.error(err);
});
