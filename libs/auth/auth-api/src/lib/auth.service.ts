import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "@uparm-automation/databases";
import { createHash } from "crypto";
import { SignInDto, SignUpDto, UserInterface } from "@uparm-automation/auth/auth-interfaces";


@Injectable()
export default class AuthService {
  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}


  /**
   * Создание нового пользователя
   * @param data
   */
  public async createUser(data: SignUpDto): Promise<UserInterface> {
    const findUserByEmail = await this.usersRepository.findOne({ where: { email: data.email }});
    if (findUserByEmail) {
      throw new BadRequestException(`Пользователь с электронной почтой ${data.email} уже существует`);
    }
    const newUser = new UserEntity(data);
    // TODO: Добавить сериализацию данных для исключения паролей
    return await this.usersRepository.save(newUser);
  }


  /**
   * Аутентификация пользователя
   * @param data
   */
  public async signIn(data: SignInDto): Promise<UserInterface> {
    const findUserByEmail = await this.usersRepository.findOne({ where: { email: data.email }});
    if (findUserByEmail.password === createHash('sha256').update(data.password).toString()) {
      // TODO: Добавить сериализацию данных для исключения паролей
      return findUserByEmail;
    } else {
      throw new UnauthorizedException('Неверный пользователь или пароль');
    }
  }



}
