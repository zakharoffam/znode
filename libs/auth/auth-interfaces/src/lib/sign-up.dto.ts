import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  login: string;

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
