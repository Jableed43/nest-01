import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //localhost:3000/api/
  app.setGlobalPrefix('api')
  //habilitar validation pipes de forma global
  app.useGlobalPipes(new ValidationPipe());
  //levantar servidor en puerto 3000
  await app.listen(3000);
}
bootstrap();