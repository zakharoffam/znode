import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventLoggerRecordEntity } from '@znode/storage';
import { EventLoggerController } from './event-logger.controller';
import { EventLoggerService } from './event-logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventLoggerRecordEntity])],
  controllers: [EventLoggerController],
  providers: [EventLoggerService],
  exports: [EventLoggerService],
})
export class EventLoggerModule {}
