import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { LoggerRecord, LoggerRecordTypes } from '@znode/storage';

@Injectable()
export class EventLoggerService extends ConsoleLogger {
  log(message: string, context?: string) {
    LoggerRecord.addRecord(LoggerRecordTypes.log, message, context).catch(
      (err) => {
        Logger.error(err.message, 'EventLoggerService.log()');
      }
    );
  }

  error(message: string, stack?: string, context?: string) {
    LoggerRecord.addRecord(LoggerRecordTypes.error, message, context).catch(
      (err) => {
        Logger.error(err.message, 'EventLoggerService.error()');
      }
    );
  }

  warn(message: string, context?: string) {
    LoggerRecord.addRecord(LoggerRecordTypes.warn, message, context).catch(
      (err) => {
        Logger.error(err.message, 'EventLoggerService.warn()');
      }
    );
  }

  debug(message: string, context?: string) {
    LoggerRecord.addRecord(LoggerRecordTypes.debug, message, context).catch(
      (err) => {
        Logger.error(err.message, 'EventLoggerService.debug()');
      }
    );
  }

  verbose(message: string, context?: string) {
    LoggerRecord.addRecord(LoggerRecordTypes.verbose, message, context).catch(
      (err) => {
        Logger.error(err.message, 'EventLoggerService.verbose()');
      }
    );
  }
}
