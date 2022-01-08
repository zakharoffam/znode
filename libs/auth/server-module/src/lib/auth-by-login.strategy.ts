import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@uparm-automation/databases";
import { Repository } from "typeorm";
import { UserInterface } from "@uparm-automation/auth/common";

@Injectable()
export class AuthByLoginStrategy {
  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}

  /**
   * Стратегия авторизации пользователя по логину
   * @param login
   */
  public async strategy(login: string): Promise<UserInterface | UnauthorizedException | ForbiddenException> {
    const user = await this.usersRepository.findOne({ where: { login: login }});
    if (!user) {
      throw new UnauthorizedException('Unauthorized', `AuthStrategy.strategy(${login})`);
    } else if (!user.isActive) {
      throw new ForbiddenException('Доступ запрещен', `AuthStrategy.strategy(${login})`);
    } else {
      return user;
    }
  }
}
