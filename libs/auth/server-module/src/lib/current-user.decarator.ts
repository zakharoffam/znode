import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInterface } from "@znode/common/interfaces";

/**
 * Декоратор возвращающий данные текущего пользователя
 */
export const CurrentUser = createParamDecorator(
  (date: unknown, ctx: ExecutionContext): UserInterface => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
