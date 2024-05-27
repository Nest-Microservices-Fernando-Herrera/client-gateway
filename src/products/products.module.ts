import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCTS_SERVICE } from 'src/config';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    // Registro y conexión con los Microservicios
    ClientsModule.register([
      // Microservicios de Productos
      { 
        name: PRODUCTS_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroserviceHost,
          port: envs.productsMicroservicePort
        }
       },
    ])
  ],
  controllers: [ProductsController],
})
export class ProductsModule {
  constructor() {
    console.log({ envs });
  }
}
