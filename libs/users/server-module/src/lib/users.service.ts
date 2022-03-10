import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "@znode/storage";

@Injectable()
export class UsersService {
  /**
   * Создание пользователя
   * @param data
   */
  public async createUser(data: CreateUserDto): Promise<UserEntity> {
    return await UserEntity.createUser(data.email, data.name, data.password);
  }

  /**
   * Найти всех пользователей
   */
  public async findAllUsers(): Promise<UserEntity[]> {
    return UserEntity.find({ relations: ['roles'] });
  }
}
