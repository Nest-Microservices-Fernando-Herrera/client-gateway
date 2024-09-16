import { Module } from '@nestjs/common';
import { envs } from 'src/config';
import { ProductsController } from './products.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProductsController],
  imports: [NatsModule],
})
export class ProductsModule {
  constructor() {
    console.log({ envs });
  }
}
