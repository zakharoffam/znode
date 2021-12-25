import { Controller, Get, Param, UnauthorizedException } from "@nestjs/common";
import { UserInterface } from "../../../auth-interfaces/src";

@Controller('auth')
export default class AuthController {
  @Get('/:login')
  private async auth(@Param('login') login: string): Promise<UserInterface> {
    if (login !== 'zakharoffam') {
      throw new UnauthorizedException();
    }

    return {
      id: Math.random().toString(16).slice(2),
      login: login,
      name: 'Антон Захаров',
    };
  }
}
