import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

@Entity('RBAC_Users')
export class UserEntity {
  @PrimaryColumn({ name: 'smId', type: 'varchar', length: 255 })
  smId: string;

  @IsString()
  @Length(1, 255)
  @Column({ name: 'smDisplayName', type: 'varchar', length: 255 })
  smDisplayName: string;

  // Активен?
  @IsBoolean()
  @Column({ name: 'isActive', type: 'bit', nullable: false })
  isActive: boolean;



  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
