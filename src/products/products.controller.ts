import { Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { PRODUCTS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/common';

@Controller('products')
export class ProductsController {
  // Inyección de dependencias
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy
  ) { }

  /* Accediendo y conectando la lógica definida en ProductsMicroservice a este Gateway */

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      // Patrón
      { cmd: 'find_all_products' },
      // Payload que recibiremos (validado)
      paginationDto
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Observable<any>> {
    /* Forma '1' */
    // try {
    //   const product = await firstValueFrom(
    //     // Esperar el primer valor que este Observable va a emitir
    //     this.productsClient.send({ cmd: 'find_product_by_id' }, { id })
    //   );

    //   return product;
    // } catch (error) {
    //   // Error captado por el filtro global de excepciones
    //   throw new RpcException(error);
    // }

    /* Forma '2' */
    return this.productsClient.send({ cmd: 'find_product_by_id' }, { id })
      .pipe(
        catchError((err) => { throw new RpcException(err) })
      )
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string) {
    return `Actualizar producto: ${id}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `Eliminar producto: ${id}`;
  }
}
