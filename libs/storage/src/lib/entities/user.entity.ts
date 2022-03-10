import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, ManyToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
  JoinTable
} from "typeorm";
import { IsBoolean, IsEmail, IsOptional, IsString, Length, validate } from "class-validator";
import { BadRequestException, ForbiddenException, Logger, UnauthorizedException } from "@nestjs/common";
import { UserPasswordEntity } from "./user-password.entity";
import { UserInterface } from "../../../../common/interfaces/src";
import { RoleEntity } from "./role.entity";


@Entity('Users')
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

  @ManyToMany(() => RoleEntity, roles => roles.users)
  @JoinTable()
  roles: RoleEntity[];


  /**
   * Создание нового пользователя
   * @param email
   * @param name
   * @param password
   */
  static async createUser(email: string, name: string, password: string): Promise<UserEntity> {
    Logger.log(`Создание нового пользователя.`, `UserEntity.createUser(${email}, ${name})`);
    const checkEmail = await this.findOne({ where: { email: email }});
    if (checkEmail) {
      Logger.warn(`${email} занят!`, `UserEntity.createUser(${email}, ${name})`);
      throw new BadRequestException(`${email} занят!`);
    }
    const countUsersWithSameName = await this.count({ where: { name: name }});
    let user = new UserEntity();
    user.email = email;
    user.name = !countUsersWithSameName ? name : `${name} - ${countUsersWithSameName + 1}`;
    const validateUserDataErrors = await validate(user);
    if (validateUserDataErrors.length) {
      Logger.warn(`${validateUserDataErrors}`, `UserEntity.createUser(${email}, ${name})`);
      throw new BadRequestException(validateUserDataErrors);
    }
    user = await this.save(user);
    try {
      await UserPasswordEntity.setPassword(user, password);
    } catch (err) {
      Logger.warn(`Пароль не прошел валидацию! Создание пользователя прервано!`, `UserEntity.createUser(${email}, ${name})`);
      await this.delete(user);
      throw new BadRequestException(err);
    }

    // Если это первый пользователь приложения - инициализируем новые роли и пользователя-админа
    const currentUsersCount = await this.count();
    if (currentUsersCount === 1) {
      Logger.log(`Создан первый пользователь приложения.`, `UserEntity.createUser(${email}, ${name})`);
      Logger.log(`Инициализируем ролевую модель и назначаем администратора!`, `UserEntity.createUser(${email}, ${name})`);
      let roleAdmin = new RoleEntity();
      roleAdmin.title = 'admin';
      roleAdmin = await RoleEntity.save(roleAdmin);
      Logger.log(`Создана роль "Администратор".`, `UserEntity.createUser(${email}, ${name})`);

      const roleUser = new RoleEntity();
      roleUser.title = 'user';
      await RoleEntity.save(roleUser);
      Logger.log(`Создана роль "Пользователь".`, `UserEntity.createUser(${email}, ${name})`);

      user.roles = [roleAdmin];
      await this.save(user);
      Logger.log(`Пользователю ${name} присвоена роль "Администратор".`, `UserEntity.createUser(${email}, ${name})`);
    }

    const roleUser = await RoleEntity.findOne({ where: { title: 'user' }});
    user.roles = [...user.roles, roleUser];
    await this.save(user);
    Logger.log(`Пользователю ${name} присвоена роль "Пользователь".`, `UserEntity.createUser(${email}, ${name})`);
    Logger.log(`Пользователь ${name} успешно зарегистрирован.`, `UserEntity.createUser(${email}, ${name})`);
    return user;
  }


  /**
   * Получить пользователя по email
   * @param email
   */
  static async getUserByEmail(email: string): Promise<UserInterface> {
    const entity = await this.findOne({where: {email: email}});
    if (!entity) {
      throw new UnauthorizedException();
    }
    if (!entity?.isActive) {
      throw new ForbiddenException();
    }
    return {
      email: entity.email,
      name: entity.name,
    };
  }
}
