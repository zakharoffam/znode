import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(7, 64)
  password: string;
}
