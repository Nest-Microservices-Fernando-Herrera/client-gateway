import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ORDERS_SERVICE } from 'src/config';
import { CreateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  // Inyección de dependencias
  constructor(
    @Inject(ORDERS_SERVICE)
    private readonly ordersClient: ClientProxy
  ) { }

  /* Accediendo y conectando la lógica definida en ProductsMicroservice a este Gateway */

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersClient.send('findAllOrders', {});
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersClient.send('findOneOrder', { id });
  }
}
