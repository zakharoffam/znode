import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsString, Length } from "class-validator";
import { RoleTypeEntity } from "./role-type.entity";

@Entity('RBAC_Roles')
export class RoleEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

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
  @Column({ name: 'isActive', type: 'bit', nullable: false })
  isActive: boolean;
}
