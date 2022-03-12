import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EventLoggerService } from '@znode/event-logger';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   bufferLogs: true,
  //   logger: new EventLoggerService,
  // });
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string | number>('PORT');
  const globalPrefix = 'api';

  // Инициализируем глобальный префикс для всех REST'ов
  app.setGlobalPrefix(globalPrefix);

  // Инициализируем глобальную валидацию всех входящих данных через DTO
  app.useGlobalPipes(new ValidationPipe());

  // Стартуем сервер
  await app.listen(port);
  Logger.log(`Сервер запущен в режиме "${process.env.NODE_ENV}" на: http://localhost:${port}/${globalPrefix}`);
}

bootstrap().catch((err) => {
  Logger.error(`При запуске сервера возникла ошибка:`, `main.boostrap()`);
  console.error(err);
});
