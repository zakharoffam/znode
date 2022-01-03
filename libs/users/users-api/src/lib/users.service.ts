import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionEntity, RoleEntity, UserEntity, UserMetadataEntity } from "@uparm-automation/databases";
import { Repository } from "typeorm";
import { CreateUserDto, UserInterface } from "@uparm-automation/users/users-interfaces";
import { validate } from "class-validator";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserMetadataEntity) private usersMetadataRepository: Repository<UserMetadataEntity>,
    @InjectRepository(RoleEntity) private rolesRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity) private permissionsRepository: Repository<PermissionEntity>,
  ) {}

  /**
   * Создать нового пользователя
   * @param data
   */
  public async createUser(data: CreateUserDto): Promise<UserInterface> {
    const userLogin = await this.usersRepository.findOne({ where: { login: data.login }});

    if (userLogin) {
      throw new BadRequestException(`Пользователь ${data.login} уже существует`);
    }

    let user = new UserEntity();
    user.login = data.login;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.fullName = `${data.lastName} ${data.firstName}`;

    if (data.middleName) {
      user.middleName = data.middleName;
      user.fullName += ` ${data.middleName}`;
    }

    user.isActive = true;
    user.metadata = new UserMetadataEntity();
    user.metadata.roles.push();

    await validate(user).then(errors => {
      if (errors.length) {
        throw new BadRequestException(errors);
      }
    });

    try {
      user = await this.usersRepository.save(user);
      return user;
    } catch (err) {
      Logger.error(err, `UsersService.createUser()`);
      throw new InternalServerErrorException(err);
    }
  }


  /**
   * Найти пользователя по логину
   * @param login
   */
  public async findUserByLogin(login: string): Promise<UserInterface> {
    const user = await this.usersRepository.findOne({ where: { login: login }});
    if (!user) {
      throw new NotFoundException(`Пользователь ${login} не найден`);
    }
    return user;
  }


}
