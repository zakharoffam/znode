import { Controller, Get } from '@nestjs/common';
import { LoggerRecord, LoggerRecordTypes } from '@znode/storage';

@Controller('event-logger')
export class EventLoggerController {
  @Get('records/add-record')
  public async postRecord(): Promise<string> {
    const message = `Тестовая запись ${Math.random().toString(32).slice(2)}`;
    const context = 'EventLoggerController.postRecord()';
    await LoggerRecord.addRecord(LoggerRecordTypes.log, message, context);
    return 'Запись успешно добавлена.';
  }

  @Get('records')
  public async getAllRecords(): Promise<LoggerRecord[]> {
    return await LoggerRecord.getAllRecords();
  }

  @Get('delete')
  public async deleteAllRecords(): Promise<string> {
    await LoggerRecord.removeAllRecords();
    return 'Общий журнал событий полностью очищен.';
  }
}
