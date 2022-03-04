import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '@znode/storage';
import { UserInterface } from '@znode/auth-server-module';

@Injectable()
export class AuthByLoginStrategy {
  /**
   * Стратегия авторизации пользователя по логину
   * @param email
   */
  public async strategy(
    email: string
  ): Promise<UserInterface | UnauthorizedException | ForbiddenException> {
    const user = await UserEntity.signIn(email, '');
    if (!user) {
      throw new UnauthorizedException(
        'Unauthorized',
        `AuthStrategy.strategy(${email})`
      );
    } else if (!user.isActive) {
      throw new ForbiddenException(
        'Доступ запрещен',
        `AuthStrategy.strategy(${email})`
      );
    } else {
      return user;
    }
  }
}
