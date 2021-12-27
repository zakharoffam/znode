import { Body, Controller, Inject, Post } from "@nestjs/common";
import { SignInDto, SignUpDto, UserInterface } from "../../../auth-interfaces/src";
import AuthService from "./auth.service";

@Controller('auth')
export default class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}


  @Post('sign-up')
  private async signUp(@Body() data: SignUpDto): Promise<UserInterface> {
    return this.authService.createUser(data);
  }


  @Post('sign-in')
  private async signIn(@Body() data: SignInDto): Promise<UserInterface> {
    return this.authService.signIn(data);
  }
}
