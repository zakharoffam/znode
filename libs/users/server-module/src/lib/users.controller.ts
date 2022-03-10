import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "@znode/storage";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Создание нового пользователя
   * @url /api/users
   * @param data
   * @private
   */
  @Post()
  private async createUser(@Body() data: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.createUser(data);
  }

  /**
   * Получить список всех пользователей
   * @url /api/users
   * @private
   */
  @Get()
  private async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.findAllUsers();
  }
}
