import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() { }

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findAllProducts() {
    return 'Listar los productos';
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
