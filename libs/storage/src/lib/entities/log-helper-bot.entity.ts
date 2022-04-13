import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('TELEGRAM_Log_helper_bot')
export class LogHelperBotEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'varchar', nullable: false })
  message: string;


  /**
   * Добавить запись
   * @param message
   */
  static async addRecord(message: string): Promise<LogHelperBotEntity> {
    let record = new LogHelperBotEntity();
    record.timestamp = new Date();
    record.message = message;
    record = await this.save(record);
    return record;
  }
}
