import { IsString } from 'class-validator';

export class EventLogDto {
  @IsString()
  type: string;

  @IsString()
  message: string;
}
