import { Controller, Get, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from './user.decarator';
import { UserInterface } from '@uparm-automation/auth-module';

@Controller('auth')
export class AuthController {
  /**
   * Метод возвращает данные авторизированного пользователя
   * @url /api/auth/user
   * @param user
   * @private
   */
  @Get('user')
  private getUser(@User() user: UserInterface): UserInterface {
    if (!user) {
      Logger.warn(
        `Не удалось аутентифицировать пользователя`,
        `AuthController.getUser(${user})`
      );
      throw new UnauthorizedException();
    }
    return user;
  }
}
