import { Module } from '@nestjs/common';
import { ExampleService } from "./services/example.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [ExampleService],
})
export class AppModule {}
