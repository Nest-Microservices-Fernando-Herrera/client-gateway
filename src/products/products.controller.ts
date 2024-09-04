import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('products')
export class ProductsController {
  // Inyección de dependencias
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  /* Accediendo y conectando la lógica definida en ProductsMicroservice a este Gateway */

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.natsClient.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.natsClient.send(
      // Patrón
      { cmd: 'find_all_products' },
      // Payload que recibiremos (validado)
      paginationDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Observable<any>> {
    /* Forma '1' */
    // try {
    //   const product = await firstValueFrom(
    //     // Esperar el primer valor que este Observable va a emitir
    //     this.natsClient.send({ cmd: 'find_product_by_id' }, { id })
    //   );

    //   return product;
    // } catch (error) {
    //   // Error captado por el filtro global de excepciones
    //   throw new RpcException(error);
    // }

    /* Forma '2' */
    return this.natsClient.send({ cmd: 'find_product_by_id' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    console.log({ id, updateProductDto });

    return this.natsClient
      .send({ cmd: 'update_product_by_id' }, { id, ...updateProductDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.natsClient.send({ cmd: 'delete_product_by_id' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
