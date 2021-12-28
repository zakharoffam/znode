import { Column, Entity, PrimaryColumn } from "typeorm";
import { SignUpDto } from "@uparm-automation/auth/auth-interfaces";
import { v4 as uuid } from "uuid";

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  readonly id: string;

  @Column({ name: 'login', type: 'varchar', length: 255, unique: true })
  login: string;

  @Column({ name: 'isActive', type: 'bit', nullable: false, default: true })
  isActive: boolean;

  @Column({ name: 'firstName', type: 'varchar', length: 80, nullable: false })
  firstName: string;

  @Column({ name: 'lastName', type: 'varchar', length: 80, nullable: false })
  lastName: string;

  @Column({ name: 'middleName', type: 'varchar', length: 80, nullable: true, default: null })
  middleName: string;

  @Column({ name: 'fullName', type: 'varchar', length: 255, nullable: false })
  fullName: string;

  constructor(data: SignUpDto) {
    this.id = uuid();
    this.login = data.login;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.middleName = data.middleName;
    let fullName = `${data.lastName} ${data.firstName}`;
    if (data.middleName) {
      fullName += ` ${data.middleName}`;
    }
    this.fullName = fullName;
  }
}
