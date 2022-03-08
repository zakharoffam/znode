import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from "argon2";
import { UserEntity } from "./user.entity";
import { BadRequestException } from "@nestjs/common";

@Entity('COMMON_User_password')
export class UserPasswordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, user => user.password)
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'varchar', length: 512, nullable: false })
  passwordHashed: string;


  /**
   * Установить пароля пользователя
   * @param user
   * @param password
   */
  static async setPassword(user: UserEntity, password: string): Promise<void> {
    if (password.length < 8 || password.length > 64) {
      throw new BadRequestException(`Длина пароля должна быть от 8 до 64 символов!`, `UserPasswordEntity.setPassword()`);
    }
    let userPassword = await this.findOne({ where: { user: user }});
    if (userPassword) {
      userPassword.passwordHashed = await argon2.hash(password);
      await this.save(userPassword);
      return;
    }
    userPassword = new UserPasswordEntity();
    userPassword.user = user;
    userPassword.passwordHashed = await argon2.hash(password);
    return;
  }


  /**
   * Это пароль пользователя?
   * @param user
   * @param password
   */
  static async isPasswordOfUser(user: UserEntity, password: string): Promise<boolean> {
    const entity = await this.findOne({ where: { user: user }});
    if (!entity) return false;
    return await argon2.verify(entity.passwordHashed, password);
  }
}
