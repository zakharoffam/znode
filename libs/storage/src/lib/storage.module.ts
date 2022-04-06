import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../../../../ormconfig';
import { UserEntity } from "./entities/user.entity";
import { UserPasswordEntity } from "./entities/user-password.entity";
import { RoleEntity } from "./entities/role.entity";
import { LogHelperBotEntity } from "./entities/telegram/log-helper-bot.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([
      // В данный массив необходимо добавлять все сущности, чтобы не интегрировать их в каждый модуль
      UserEntity, UserPasswordEntity, RoleEntity,
      LogHelperBotEntity,
    ]),
  ]
})
export class StorageModule {}
