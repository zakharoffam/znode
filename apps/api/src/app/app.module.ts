import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthApiModule } from "@uparm-automation/auth/auth-api";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { ConfigModule } from "@nestjs/config";
import { DatabasesModule } from "@uparm-automation/databases";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web')
    }),
    //DatabasesModule,
    AuthApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
