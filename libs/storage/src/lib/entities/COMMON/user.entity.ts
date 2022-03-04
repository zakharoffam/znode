import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { IsOptional, IsString, IsBoolean, Length, validate } from "class-validator";
import { BadRequestException } from "@nestjs/common";
import { UserPasswordEntity } from "./user-password.entity";


@Entity('COMMON_Users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;

  @IsString()
  @Length(1, 255)
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @IsString()
  @Length(1, 255)
  @Column({ type: 'varchar', length: 255, nullable: false})
  login: string;

  @IsOptional()
  @IsBoolean()
  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @OneToOne(type => UserPasswordEntity, password => password.user)
  password: UserPasswordEntity;


  /**
   * Регистрация нового пользователя
   * @param email
   * @param password
   * @param login
   */
  static async signUp(email: string, login: string, password: string): Promise<UserEntity> {
    const findUserByEmail = await this.findOne({ where: { email: email }});
    if (findUserByEmail) {
      throw new BadRequestException(`${email} занят.`);
    }
    const countUsersWithSameName = await this.count({ where: { login: login }});
    let user = new UserEntity();
    user.email = email;
    user.login = !countUsersWithSameName ? login : `${login}-${countUsersWithSameName + 1}`;
    const validateUserDataErrors = await validate(user);
    if (validateUserDataErrors.length) {
      throw new BadRequestException(validateUserDataErrors);
    }
    const validatePasswordErrors = UserPasswordEntity.validatePassword(password);
    if (validatePasswordErrors.length) {
      throw new BadRequestException(validatePasswordErrors);
    }
    user = await this.save(user);
    await UserPasswordEntity.setPassword(user, password);
    return user;
  }


  /**
   * Вход пользователя
   * @param email
   * @param password
   */
  static async signIn(email: string, password: string): Promise<UserEntity | false> {
    const user = await this.findOne({ where: { email: email }});
    if (!user) return false;
    const isPasswordOfUser = await UserPasswordEntity.isPasswordOfUser(user, password);
    if (!isPasswordOfUser) return false;
    return user;
  }
}
