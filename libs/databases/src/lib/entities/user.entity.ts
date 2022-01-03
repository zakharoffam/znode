import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";
import { UserMetadataEntity } from "./user-metadata.entity";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Length(5, 255)
  @Column({ name: 'login', type: 'varchar', length: 255, unique: true })
  login: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  @Column({ name: 'firstName', type: 'varchar', length: 80, nullable: false })
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  @Column({ name: 'lastName', type: 'varchar', length: 80, nullable: false })
  lastName: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  @Column({ name: 'middleName', type: 'varchar', length: 80, nullable: true, default: null })
  middleName: string;

  @Column({ name: 'fullName', type: 'varchar', length: 255, nullable: false })
  fullName: string;

  @OneToOne(type => UserMetadataEntity, md => md.user, { cascade: true })
  metadata: UserMetadataEntity;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column({ name: 'isActive', type: 'boolean', nullable: false, default: true })
  isActive: boolean;
}
