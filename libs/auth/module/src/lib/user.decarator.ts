import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Декоратор пользователя
 * Возможно передать в качестве аргумента имя параметра например - @User('login')
 */
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.session.cookie.user;
    return data ? user?.[data] : user;
  }
);
