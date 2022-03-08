import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { IsBoolean, IsEmail, IsOptional, IsString, Length, validate } from "class-validator";
import { BadRequestException, ForbiddenException } from "@nestjs/common";
import { UserPasswordEntity } from "./user-password.entity";
import { UserInterface } from "@znode/auth-server-module";


@Entity('COMMON_Users')
export class UserEntity extends BaseEntity {
  @IsEmail()
  @Length(1, 255)
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  email: string;

  @IsString()
  @Length(1, 255)
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  name: string;

  @IsOptional()
  @IsBoolean()
  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;

  @OneToOne(() => UserPasswordEntity, password => password.user)
  password: UserPasswordEntity;


  /**
   * Регистрация нового пользователя
   * @param email
   * @param name
   * @param password
   */
  static async createUser(email: string, name: string, password: string): Promise<UserEntity> {
    const checkEmail = await this.findOne({ where: { email: email }});
    if (checkEmail) {
      throw new BadRequestException(`${email} занят!`);
    }
    const countUsersWithSameName = await this.count({ where: { name: name }});
    let user = new UserEntity();
    user.email = email;
    user.name = !countUsersWithSameName ? name : `${name} - ${countUsersWithSameName + 1}`;
    const validateUserDataErrors = await validate(user);
    if (validateUserDataErrors.length) {
      throw new BadRequestException(validateUserDataErrors);
    }
    user = await this.save(user);
    try {
      await UserPasswordEntity.setPassword(user, password);
    } catch (err) {
      await this.delete(user);
      throw new BadRequestException(err);
    }
    return user;
  }


  /**
   * Получить пользователя по email
   * @param email
   */
  static async getUserByEmail(email: string): Promise<UserInterface> {
    const entity = await this.findOne({where: {email: email}});
    if (!entity.isActive) {
      throw new ForbiddenException();
    }
    return {
      email: entity.email,
      name: entity.name,
    };
  }

}
