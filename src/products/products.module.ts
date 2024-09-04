import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/config';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    // Registro y conexión con los Microservicios
    ClientsModule.register([
      // Microservicios de Productos
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {
  constructor() {
    console.log({ envs });
  }
}
