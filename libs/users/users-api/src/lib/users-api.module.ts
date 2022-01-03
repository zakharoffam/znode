import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionEntity, RoleEntity, UserEntity, UserMetadataEntity } from "@uparm-automation/databases";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { RoleModelController } from "./role-model.controller";
import { RoleModelService } from "./role-model.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserMetadataEntity,
      RoleEntity,
      PermissionEntity,
    ]),
  ],
  controllers: [UsersController, RoleModelController],
  providers: [UsersService, RoleModelService],
  exports: [],
})
export class UsersApiModule {}
