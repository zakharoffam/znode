import { IsString, MaxLength, MinLength } from "class-validator";

export class SignInDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  login: string;
}
