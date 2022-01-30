import { Module } from '@nestjs/common';
import { EventLogController } from './event-log.controller';

@Module({
  imports: [],
  controllers: [EventLogController],
  providers: [],
  exports: [],
})
export class EventLogModule {}
