import { Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from 'src/config';

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
  findAllProducts() {
    return this.productsClient.send(
      // Patrón
      { cmd: 'find_all_products' },
      // Payload que recibiremos
      {}
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Traer producto: ${id}`;
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
