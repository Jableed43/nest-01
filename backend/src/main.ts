import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //localhost:3000/api/
  app.setGlobalPrefix('api')
  //levantar servidor en puerto 3000
  await app.listen(3000);
}
bootstrap();