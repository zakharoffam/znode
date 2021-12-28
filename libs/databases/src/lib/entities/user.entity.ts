import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column({ name: 'login', type: 'varchar', length: 255, unique: true })
  login: string;

  @Column({ name: 'isActive', type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @Column({ name: 'firstName', type: 'varchar', length: 80, nullable: false })
  firstName: string;

  @Column({ name: 'lastName', type: 'varchar', length: 80, nullable: false })
  lastName: string;

  @Column({ name: 'middleName', type: 'varchar', length: 80, nullable: true, default: null })
  middleName: string;

  @Column({ name: 'fullName', type: 'varchar', length: 255, nullable: false })
  fullName: string;
}
