import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Definiendo el Logger
  const logger = new Logger('Main-Gateway')

  const app = await NestFactory.create(AppModule);  

  // Definiendo el prefijo
  app.setGlobalPrefix('api');

  // Levantando el servidor
  await app.listen(envs.port);
  logger.log(`Gateway running ong PORT: ${envs.port}`);
}
bootstrap();
