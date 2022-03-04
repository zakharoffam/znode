import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from "argon2";
import { UserEntity } from "@znode/storage";

@Entity('COMMON_User_password')
export class UserPasswordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'varchar', length: 512, nullable: false })
  passwordHashed: string;


  /**
   * Валидация пароля на соответствие стандарту
   * @param password
   */
  static validatePassword(password: string): string[] {
    const errors = [];
    if (typeof password !== 'string') errors.push('Не является паролем!');
    if (password.length < 8) errors.push('Длина пароля менее 8 символов!');
    if (password.length > 64) errors.push('Длина пароля более 64 символов!');
    return errors;
  }


  /**
   * Создание или изменение пароля пользователя
   * @param user
   * @param password
   */
  static async setPassword(user: UserEntity, password: string): Promise<void> {
    let userPassword = await this.findOne({ where: { user: user }});
    if (userPassword) {
      userPassword.passwordHashed = await argon2.hash(password);
      await this.save(userPassword);
      return;
    }
    userPassword = new UserPasswordEntity();
    userPassword.user = user;
    userPassword.passwordHashed = await argon2.hash(password);
    await this.save(userPassword);
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
    const passwordHash = await argon2.hash(password);
    return entity.passwordHashed === passwordHash;
  }
}
