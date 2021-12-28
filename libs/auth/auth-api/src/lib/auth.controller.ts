import { Controller, Get } from "@nestjs/common";
import { User } from "./user.decarator";
import { UserInterface } from "@uparm-automation/auth/auth-interfaces";

@Controller('auth')
export default class AuthController {
  /**
   * Метод возвращает данные авторизированного пользователя
   * @url /api/auth
   * @param user
   * @private
   */
  @Get()
  private getUser(@User() user: UserInterface): UserInterface {
    return user;
  }
}
