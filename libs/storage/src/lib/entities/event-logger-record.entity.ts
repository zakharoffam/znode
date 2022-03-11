import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum RecordTypes {
  log = 'log',
  warn = 'warn',
  error = 'error',
  verbose = 'verbose',
  debug = 'debug'
}

/**
 * Запись журнала событий
 */
@Entity()
export class EventLoggerRecordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestamp: string;

  @Column({ type: 'varchar', nullable: false, enum: RecordTypes })
  type: RecordTypes;

  @Column({ type: 'varchar', nullable: false })
  message: string;

  @Column({ type: 'varchar', nullable: true })
  context: string | null;

  
  /**
   * Добавить запись в журнал событий
   * @param type Тип записи
   * @param message Сообщение
   * @param context Контекст в котором вызывается метод
   * @returns 
   */
  static async addRecord(type: RecordTypes, message: string, context?: string): Promise<EventLoggerRecordEntity> {
    let record = new EventLoggerRecordEntity();
    record.type = type;
    record.message = message;
    record.context = context ?? null;
    record = await this.save(record);
    return record;
  }
}