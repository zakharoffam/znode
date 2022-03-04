import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthByLoginStrategy } from './auth-by-login.strategy';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authByLoginStrategy: AuthByLoginStrategy) {}

  /**
   * Промежуточный обработчик аутентификации пользователя
   * @param req
   * @param res
   * @param next
   */
  async use(req: any, res: any, next: NextFunction) {
    if (!req.session.cookie.user) {
      const login = req.headers['X_AUTH_USER'] ?? process.env.USER;
      req.session.cookie.user = await this.authByLoginStrategy.strategy(login);
    }
    next();
  }
}
