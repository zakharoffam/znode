import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserInterface } from "@znode/auth-server-module";
import { UserEntity } from "@znode/storage";

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  /**
   * Валидация пользователя
   * @param email
   * @param password
   */
  async validate(email: string, password: string): Promise<UserInterface | UnauthorizedException | ForbiddenException> {
    const user = await UserEntity.signIn(email, password);
    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль!');
    } else if (!user.isActive) {
      throw new ForbiddenException('Доступ запрещен!');
    } else {
      return user;
    }
  }
}
