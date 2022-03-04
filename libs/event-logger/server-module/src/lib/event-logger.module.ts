import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerRecord } from '@znode/storage';
import { EventLoggerService } from './event-logger.service';
import { EventLoggerController } from './event-logger.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LoggerRecord])],
  controllers: [EventLoggerController],
  providers: [EventLoggerService],
  exports: [EventLoggerService],
})
export class EventLoggerModule {}
