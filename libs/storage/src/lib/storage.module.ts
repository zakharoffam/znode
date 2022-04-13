import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../../../../ormconfig';
import { LogHelperBotEntity } from "./entities/log-helper-bot.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([
      LogHelperBotEntity,
    ]),
  ]
})
export class StorageModule {}
