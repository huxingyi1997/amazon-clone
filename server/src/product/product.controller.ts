import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';
import { Product, ProductDocument } from './product.schema';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@ApiTags('product')
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

  @UseGuards(JwtGuard)
  @Get(':id')
  findProduct(@Param('id') id: string): Promise<ProductDocument> {
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
