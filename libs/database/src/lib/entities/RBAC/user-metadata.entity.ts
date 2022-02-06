import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "@uparm-automation/database";
import { IsNumber, Max, Min } from "class-validator";

@Entity('RBAC_UserMetadata')
export class UserMetadataEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @OneToOne(type => UserEntity)
  @JoinColumn()
  user: UserEntity;

  // Часовой пояс пользователя
  @IsNumber()
  @Min(-12)
  @Max(12)
  @Column({ name: 'timeZone', type: 'int', nullable: false })
  timeZone: number;
}
