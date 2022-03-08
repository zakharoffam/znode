import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from './auth.service';
import { UserEntity } from "@znode/storage";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  /**
   * Промежуточный обработчик аутентификации пользователя
   * @param req
   * @param res
   * @param next
   */
  async use(req: any, res: any, next: NextFunction) {
    const auth = req.headers['Authorization'];
    if (!auth) {
      // Если в запросе нет токена авторизации отправим клиента на страницу авторизации
      throw new UnauthorizedException();
    }
    // Извлечем токен из заголовка авторизации
    const inputToken = String(auth).replace('Bearer ', '');

    // Расшифруем полученный токен
    const decodeToken = this.authService.decryptJwt(inputToken);
    if (!decodeToken?.user?.email) {
      // Если в расшифрованном токене отсутствуют пользовательские данные токен явно поддельный
      throw new UnauthorizedException();
    }
    let user = decodeToken.user;

    if (Date.now() > Number(String(decodeToken.exp) + '000')) {
      // Если срок действия токена просрочен, запросим новый токен и пользовательские данные
      user = await UserEntity.getUserByEmail(decodeToken.user.email);
      const newToken = this.authService.encryptJwt(user);
      // Обновим токен клиенту
      res.setHeader('Authorization', `Bearer ${newToken}`);
    }
    req.user = user;
    next();
  }
}
