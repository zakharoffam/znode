import { Body, Controller, Get, Post, Res, } from '@nestjs/common';
import { Response } from 'express';
import { SignInDto } from './sign-in.dto';
import { CurrentUser } from './current-user.decarator';
import { AuthService } from "./auth.service";
import { UserEntity } from "@znode/storage";
import { SignUpDto } from "./sign-up.dto";
import { UserInterface } from "@znode/common/interfaces";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Войти
   * @url /api/auth/sign-in
   * @param response
   * @param data
   */
  @Post('sign-in')
  public async signIn(@Body() data: SignInDto, @Res() response: Response) {
    const user = await this.authService.checkEmailAndPassword(data.email, data.password);
    const token = this.authService.encryptJwt(user);
    response.setHeader('Authorization', `Bearer ${token}`);
    response.send({
      token: token,
      user: user,
    });
    response.end();
  }


  /**
   * Регистрация нового пользователя
   * @param data
   */
  @Post('sign-up')
  public async signUp(@Body() data: SignUpDto) {
    return await UserEntity.createUser(data.email, data.name, data.password);
  }


  /**
   * Метод возвращает данные текущего пользователя пользователя
   * @url /api/auth/current-user
   * @param user
   * @private
   */
  @Get('current-user')
  public getUser(@CurrentUser() user: UserInterface): UserInterface {
    return user;
  }
}
