import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserInterface } from "@znode/common/interfaces";
import { UserEntity, UserPasswordEntity } from "@znode/storage";
import { JwtService } from "@nestjs/jwt";


export interface Token {
  user: UserInterface;
  iat: number;
  exp: number;
}


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  /**
   * Проверка адреса электропочты и пароля
   * @param email
   * @param password
   */
  public async checkEmailAndPassword(email: string, password: string): Promise<UserInterface> {
    const user = await UserEntity.findOne({ where: { email: email }});
    if (!user) {
      throw new UnauthorizedException(`${email} не зарегистрирован!`, `AuthLocalStrategy.validate()`);
    }
    const checkPassword = await UserPasswordEntity.isPasswordOfUser(user, password);
    if (!checkPassword) {
      throw new UnauthorizedException(`Неверный пароль!`, `AuthLocalStrategy.validate()`);
    }
    if (!user.isActive) {
      throw new ForbiddenException(`Доступ запрещен!`, `AuthLocalStrategy.validate()`);
    }
    return user;
  }


  /**
   * Зашифровать токен JWT
   * @param user
   */
  public encryptJwt(user: UserInterface): string {
    const payload = { user };
    return this.jwtService.sign(payload);
  }


  /**
   * Расшифровать токен JWT
   * @param token
   */
  public decryptJwt(token: string): Token {
    return this.jwtService.decode(token) as Token;
  }
}
