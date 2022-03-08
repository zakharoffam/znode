import {
  Body,
  Controller,
  Get,
  Post, Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserInterface } from './user.interface';
import { SignInDto} from './sign-in.dto';
import { CurrentUser } from './current-user.decarator';
import { AuthService } from "./auth.service";

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
  public async signIn(@Body() data: SignInDto, @Res() response: Response): Promise<{ token: string, user: UserInterface }> {
    const user = await this.authService.checkEmailAndPassword(data.email, data.password);
    const token = this.authService.encryptJwt(user);
    response.setHeader('Authorization', `Bearer ${token}`);
    return {
      token: token,
      user: user,
    };
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
