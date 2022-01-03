import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from './user.entity';
import { RoleEntity } from "./role.entity";
import { PermissionEntity } from "./permission.entity";

@Entity('usersMetadata')
export class UserMetadataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => UserEntity, user => user.metadata)
  @JoinColumn()
  user: UserEntity

  @Column({ name: 'birthDate', type: 'date' })
  birthDate: Date;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions: PermissionEntity[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
