import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { PermissionEntity } from "./permission.entity";

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MinLength(5)
  @MaxLength(150)
  @Column({ name: 'name', type: 'varchar', length: 150, unique: true, nullable: false })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  @Column({ name: 'description', type: 'varchar', length: 500 })
  description: string;

  @OneToMany(type => PermissionEntity, p => p.role, { cascade: true })
  permissions: PermissionEntity[];

  @Column({ name: 'isActive', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
