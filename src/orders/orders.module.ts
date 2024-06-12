import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDERS_SERVICE } from 'src/config';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    // Registro y conexión con los Microservicios
    ClientsModule.register([
      // Microservicios de Productos
      {
        name: ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMicroserviceHost,
          port: envs.ordersMicroservicePort
        }
      },
    ])
  ],
  controllers: [OrdersController],
})
export class OrdersModule { }
