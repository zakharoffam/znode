import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = await configService.get<string|number>('PORT');
  const globalPrefix = 'api';

  // Устанавливаем префикс для всех эндпоинтов приложения
  app.setGlobalPrefix(globalPrefix);

  // Подключаем глобальный валидатор
  app.useGlobalPipes(new ValidationPipe());



  // Запускаем сервер
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap()
  .catch(err => {
    Logger.error('В работе сервера возникла ошибка:', 'main.bootstrap()');
    console.error(err);
  });
