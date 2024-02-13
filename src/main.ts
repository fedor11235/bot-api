import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('SlonBot api')
    .setDescription('Апишка, каждый отдельный блок эндпоинтов это мудули в апишки, не все логично правильно разбито на модули и не всё разбивалось рукаводствуюят одной логикой')
    .setVersion('1.0')
    .addTag('Каждый тег это мудуль в api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
