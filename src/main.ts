import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { updateTable } from './worker'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();

// updateTable()