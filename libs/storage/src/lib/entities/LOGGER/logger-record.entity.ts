import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEnum, IsOptional, IsString, Length, validate } from 'class-validator';


export enum LoggerRecordTypes {
  log = 'log',
  error = 'error',
  warn = 'warn',
  debug = 'debug',
  verbose = 'verbose'
}


@Entity('LOGGER_records')
export class LoggerRecord extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestamp: Date;

  @IsEnum(LoggerRecordTypes)
  @Column({ type: 'varchar', length: 10, nullable: false, enum: LoggerRecordTypes })
  type: LoggerRecordTypes;

  @IsString()
  @Length(1, 1000)
  @Column({ type: 'varchar', length: 1000, nullable: false })
  message: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  @Column({ type: 'varchar', length: 255, nullable: true })
  context: string | null;


  /**
   * Добавь запись в общий журнал событий
   * @param type
   * @param message
   * @param context
   */
  static async addRecord(type: LoggerRecordTypes, message: string, context?: string): Promise<LoggerRecord> {
    const record = new LoggerRecord();
    record.type = type;
    record.message = message;
    record.context = context ?? null;
    await validate(record);
    return await this.save(record);
  }


  /**
   * Получить все записи общего журнала событий
   */
  static async getAllRecords(): Promise<LoggerRecord[]> {
    return await this.find();
  }


  /**
   * Удаление всех записей общего журнала событий
   */
  static async removeAllRecords(): Promise<void> {
    await this.clear();
  }
}
