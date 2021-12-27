import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class SignInDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(7)
  @MaxLength(64)
  password: string;
}
