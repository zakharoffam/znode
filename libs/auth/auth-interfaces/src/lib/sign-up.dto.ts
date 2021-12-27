import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(7)
  @MaxLength(64)
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  lastName: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  middleName: string;
}
