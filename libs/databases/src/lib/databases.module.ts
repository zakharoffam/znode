import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_UPARM_HOST,
      port: Number(process.env.DATABASE_UPARM_PORT),
      database: process.env.DATABASE_UPARM_NAME,
      username: process.env.DATABASE_UPARM_USER,
      password: process.env.DATABASE_UPARM_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
      retryAttempts: 3,
    })
  ]
})
export class DatabasesModule {}
