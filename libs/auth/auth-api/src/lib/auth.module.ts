import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@uparm-automation/databases";
import { AuthByLoginStrategy } from "./auth-by-login.strategy";
import { AuthMiddleware } from "./auth.middleware";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthByLoginStrategy],
  exports: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // Промежуточный обработчик аутентификации пользователя будет применен только к пути host/api
    consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
