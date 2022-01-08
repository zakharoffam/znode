import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { DatabasesModule } from "@uparm-automation/databases";
import { AuthModule } from "@uparm-automation/auth/server-module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web-client'),
    }),
    DatabasesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
