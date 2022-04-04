import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UserInterface } from "@znode/common/interfaces";

interface RequestWithUser extends Request {
  user: UserInterface;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  /**
   * Промежуточный обработчик аутентификации пользователя
   * @param req
   * @param res
   * @param next
   */
  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    let user: UserInterface;
    const currentAccessToken = req.headers['x-access-token'];
    if (!currentAccessToken) {
      user = { email: 'guest@znode.ru', name: 'Гость' };
      const token = this.authService.encryptJwt(user);
      res.setHeader('x-access-token', JSON.stringify(token));
      req.user = user;
      next();
    } else {
      const decodeToken = this.authService.decryptJwt(String(currentAccessToken));
      if (Date.now() > Date.parse(decodeToken.exp + '000')) {
        user = { email: 'guest@znode.ru', name: 'Гость' };
        const token = this.authService.encryptJwt(user);
        res.setHeader('x-access-token', JSON.stringify(token));
        req.user = user;
        next();
      } else {
        req.user = decodeToken.user;
        next();
      }
    }
  }

}
