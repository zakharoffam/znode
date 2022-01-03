import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsString, MaxLength, MinLength } from "class-validator";
import { RoleEntity } from "./role.entity";

@Entity('permissions')
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => RoleEntity, role => role.permissions)
  role: RoleEntity;

  @IsString()
  @MinLength(5)
  @MaxLength(150)
  @Column({ name: 'name', type: 'varchar', length: 150, nullable: false })
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(500)
  @Column({ name: 'description', type: 'varchar', length: 500, nullable: false })
  description: string;

  @Column({ name: 'isActive', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
