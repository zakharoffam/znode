import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'fullName', type: 'nvarchar' })
  fullName: string;
}
