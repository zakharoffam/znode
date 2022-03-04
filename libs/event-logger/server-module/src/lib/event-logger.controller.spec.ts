import { EventLoggerController } from './event-logger.controller';
import { LoggerRecord } from '@znode/storage';

describe('EventLoggerController', () => {
  let eventLoggerController: EventLoggerController;

  beforeEach(() => {
    eventLoggerController = new EventLoggerController();
  });

  describe('addNew', () => {
    it('должны вернуться логи', async () => {
      const result = new LoggerRecord();
      expect(await eventLoggerController.postRecord()).toBe(result);
    });
  });
});
