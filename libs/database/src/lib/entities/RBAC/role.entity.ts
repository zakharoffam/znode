import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { RoleTypeEntity } from "./role-type.entity";

@Entity('RBAC_Roles')
export class RoleEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  // TODO: Добавить валидацию
  @ManyToOne(type => RoleTypeEntity, roleType => roleType.roles)
  roleType: RoleTypeEntity;

  @IsString()
  @Length(1, 100)
  @Column({ name: 'title', type: 'varchar', length: 100, unique: true })
  title: string;

  @IsString()
  @Length(1, 500)
  @Column({ name: 'description', type: 'varchar', length: 500, nullable: false })
  description: string;

  // Активна
  @IsBoolean()
  @Column({ name: 'active', type: 'bit', nullable: false })
  active: boolean;

  // Удалена?
  @IsOptional()
  @IsBoolean()
  @Column({ name: 'deleted', type: 'bit', nullable: false, default: 0 })
  deleted: boolean;
}
