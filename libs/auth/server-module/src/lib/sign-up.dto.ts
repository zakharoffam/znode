import { IsEmail, IsString, Length } from "class-validator";

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 64)
  password: string;
}
