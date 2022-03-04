import { Test } from "@nestjs/testing";
import { StorageModule } from "@znode/storage";
import { getManager } from "typeorm";

describe('StorageModule', () => {
  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [StorageModule],
    }).compile();
  });

  it('должно вернуть текущее время СУБД которое равно текущему времени приложения', async () => {
    const SQL = getManager();
    const result = await SQL.query(`select datetime('now')`);
    expect(result[0][`datetime('now')`])
      .toEqual(new Date()
        .toISOString()
        .replace('T', ' ')
        .slice(0, 19)
      );
  });
});
