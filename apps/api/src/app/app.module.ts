import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from "@uparm-automation/auth/auth-api";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { ConfigModule } from "@nestjs/config";
import { DatabasesModule } from "@uparm-automation/databases";
import { UsersApiModule } from "@uparm-automation/users/users-api";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web')
    }),
    DatabasesModule,
    AuthModule,
    UsersApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
