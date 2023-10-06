import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';
import { Product } from './product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@ApiTags('product')
@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
})
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.find(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.delete(id);
  }
}
