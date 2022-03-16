import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Telegram_update')
export class TeleramUpdateEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'varchar' })
  message: string;


  /**
   * Добавить запись
   * @param message
   */
  static async addRecord(message: string): Promise<TeleramUpdateEntity> {
    let record = new TeleramUpdateEntity();
    record.message = message;
    record = await this.save(record);
    return record;
  }
}
