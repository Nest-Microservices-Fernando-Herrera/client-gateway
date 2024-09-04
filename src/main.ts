import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  // Definiendo el Logger
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);

  // Definiendo el prefijo
  app.setGlobalPrefix('api');

  // Configuración global de los Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      // Habilitandod los DTOs
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración global de los Filters
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  // Levantando el servidor
  await app.listen(envs.port);
  logger.log(`Gateway running ong PORT: ${envs.port}`);
}
bootstrap();
