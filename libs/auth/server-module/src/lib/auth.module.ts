import { MiddlewareConsumer, Module, NestModule, RequestMethod, } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { UserEntity, UserPasswordEntity } from "@znode/storage";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserPasswordEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '180s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/sign-in', method: RequestMethod.POST },
        { path: 'auth/current-user', method: RequestMethod.GET },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
