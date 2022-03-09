import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInterface } from "@znode/common/interfaces";

/**
 * Декоратор возвращающий данные текущего пользователя
 */
export const CurrentUser = createParamDecorator(
  (ctx: ExecutionContext): UserInterface => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
