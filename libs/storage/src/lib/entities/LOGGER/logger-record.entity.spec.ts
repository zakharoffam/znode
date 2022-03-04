import { Test } from "@nestjs/testing";
import { LoggerRecord, LoggerRecordTypes, StorageModule } from "@znode/storage";
import { TypeOrmModule } from "@nestjs/typeorm";

describe('LoggerRecord', () => {
  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [
        StorageModule,
        TypeOrmModule.forFeature([LoggerRecord]),
      ],
    }).compile();
  });

  describe('addRecord', () => {
    it('должно вернуть добавленную запись', async () => {
      expect(await LoggerRecord.addRecord(LoggerRecordTypes.log, 'test'))
        .toBeInstanceOf(LoggerRecord);
    });

    it('должно вернуть исключение валидатора', async () => {
      expect(await LoggerRecord.addRecord(LoggerRecordTypes.log, ''))
        .toBeInstanceOf(Error);
    });
  });

  describe('getAllRecords', () => {
    it('должно вернуть список записей', async () => {
      expect(await LoggerRecord.getAllRecords())
        .toBeInstanceOf(Array);
    })
  });

  //describe('removeAllRecords');
});
