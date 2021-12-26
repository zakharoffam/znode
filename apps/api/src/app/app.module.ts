import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthApiModule } from "@uparm-automation/auth/auth-api";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web')
    }),
    AuthApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
