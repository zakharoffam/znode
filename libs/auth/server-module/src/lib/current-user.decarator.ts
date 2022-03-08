import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInterface } from "./user.interface";

/**
 * Декоратор возвращающий данные текущего пользователя
 */
export const CurrentUser = createParamDecorator(
  (ctx: ExecutionContext): UserInterface => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
