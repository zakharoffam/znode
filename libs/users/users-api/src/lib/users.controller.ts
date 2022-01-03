import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UserInterface } from "@uparm-automation/users/users-interfaces";

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}


  /**
   * Создать пользователя
   * @url /api/users
   * @param data
   * @private
   */
  @Post()
  private async createUser(@Body() data: CreateUserDto): Promise<UserInterface> {
    return await this.usersService.createUser(data);
  }


  /**
   * Найти пользователя по логину
   * @url /api/users/:login
   * @param login
   * @private
   */
  @Get('/:login')
  private async getUser(@Param('login') login: string): Promise<UserInterface> {
    return await this.usersService.findUserByLogin(login);
  }
}
