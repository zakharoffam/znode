import { Module } from '@nestjs/common';
import AuthController from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@uparm-automation/databases";
import AuthService from "./auth.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthApiModule {}
