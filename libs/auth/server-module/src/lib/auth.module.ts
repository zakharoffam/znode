import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthByLoginStrategy } from './auth-by-login.strategy';
import { AuthMiddleware } from './auth.middleware';
import { UserEntity } from "@znode/storage";
import { PassportModule } from "@nestjs/passport";
import { AuthLocalStrategy } from "./auth-local.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthByLoginStrategy, AuthLocalStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
