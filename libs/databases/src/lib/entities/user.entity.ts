import { Column, Entity, PrimaryColumn } from "typeorm";
import { SignUpDto } from "@uparm-automation/auth/auth-interfaces";
import { v4 as uuid } from "uuid";
import { createHash } from "crypto";

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  readonly id: string;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 256, nullable: false })
  password: string; // Пароль не хранится в открытом виде, только хеш

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
    this.email = data.email;
    this.password = createHash('sha256').update(data.password).toString();
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
