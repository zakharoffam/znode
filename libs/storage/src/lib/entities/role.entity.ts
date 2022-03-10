import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsString, Length } from "class-validator";
import { UserEntity } from "./user.entity";

@Entity('Roles')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Length(1, 50)
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  title: string;

  @ManyToMany(() => UserEntity, user => user.roles)
  users: UserEntity[];
}
