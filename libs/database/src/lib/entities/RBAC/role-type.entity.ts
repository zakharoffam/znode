import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { RoleEntity } from "./role.entity";

@Entity('RBAC_TypesОfRoles')
export class RoleTypeEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @IsString()
  @Length(1, 100)
  @Column({ name: 'title', type: 'varchar', length: 100, unique: true })
  title: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  @Column({ name: 'description', type: 'varchar', length: 500, nullable: false })
  description: string;

  // Минимальное количество ролей
  // Если значение не равно 0, пользователю должно быть обязательно
  // назначено указанное количество ролей данного типа
  @IsNumber()
  @Min(0)
  @Max(100)
  @Column({ name: 'minimumCountOfRoles', type: 'int', nullable: false })
  minimumCountOfRoles: number;

  @IsArray()
  @OneToMany(type => RoleEntity, role => role.roleType)
  roles: RoleEntity[];

  // Активен или нет данный тип ролей
  @IsBoolean()
  @Column({ name: 'isActive', type: 'bit', nullable: false })
  isActive: boolean;
}
