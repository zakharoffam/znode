import { RecordTypes } from "@znode/storage";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class EventLoggerRecordDto {
  @IsEnum(RecordTypes)
  type: RecordTypes;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  context?: string;
}