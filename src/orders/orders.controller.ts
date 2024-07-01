import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ORDERS_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDTO, StatusDto } from './dto';
import { PaginationDto } from 'src/common';

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
  findAll(@Query() orderPaginationDto: OrderPaginationDTO) {
    // return orderPaginationDto;
    return this.ordersClient.send('findAllOrders', orderPaginationDto);
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', { id })
      .pipe(
        catchError((err) => { throw new RpcException(err) })
      );
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    return this.ordersClient.send('findAllOrders', {
      ...paginationDto,
      status: statusDto.status
    }).pipe(
      catchError((err) => { throw new RpcException(err) })
    );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ) {
    return this.ordersClient.send('changeOrderStatus', { id, status: statusDto.status })
      .pipe(
        catchError((err) => { throw new RpcException(err) })
      );
  }
}
