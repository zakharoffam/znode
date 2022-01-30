import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

(async function scheduler() {
  await NestFactory.createApplicationContext(AppModule);
})();
