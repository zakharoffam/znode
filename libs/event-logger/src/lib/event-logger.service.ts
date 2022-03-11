import { ConsoleLogger, Injectable } from "@nestjs/common";
import { EventLoggerRecordEntity, RecordTypes } from "@znode/storage";

@Injectable()
export class EventLoggerService extends ConsoleLogger {
  private stdout(message: string, context?: string) {
    console.log('EVENT LOGGER');
    console.log('timestamp: ' + new Date().toISOString());
    console.log('context: ' + context);
    console.log('message: ' + message);
    console.log();
  }


  log(message: string, context?: string): void {
    this.stdout(message, context);
    EventLoggerRecordEntity.addRecord(RecordTypes.log, message, context);
  }

  warn(message: string, context?: string): void {
    this.stdout(message, context);
    EventLoggerRecordEntity.addRecord(RecordTypes.warn, message, context);
  }

  erroe(message: string, context?: string): void {
    this.stdout(message, context);
    EventLoggerRecordEntity.addRecord(RecordTypes.error, message, context);
  }

  verbose(message: string, context?: string): void {
    this.stdout(message, context);
    EventLoggerRecordEntity.addRecord(RecordTypes.verbose, message, context);
  }

  debug(message: string, context?: string): void {
    this.stdout(message, context);
    EventLoggerRecordEntity.addRecord(RecordTypes.debug, message, context);
  }
}