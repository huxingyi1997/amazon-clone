import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';
import {
  CreateProductDto,
  GetAllProductsVo,
  GetProductVo,
  UpdateProductDto,
} from './dto/product.dto';
import { ApiUnifiedCreatedResponse, ApiUnifiedOkResponse } from 'src/utils';

@ApiTags('product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiUnifiedCreatedResponse(GetProductVo)
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<GetProductVo> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiUnifiedOkResponse(GetAllProductsVo)
  findAllProducts(): Promise<GetAllProductsVo> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiUnifiedOkResponse(GetProductVo)
  findProduct(@Param('id') id: string): Promise<GetProductVo> {
    return this.productService.find(id);
  }

  @Patch(':id')
  @ApiUnifiedOkResponse(GetProductVo)
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<GetProductVo> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiUnifiedOkResponse(GetProductVo)
  deleteProduct(@Param('id') id: string): Promise<GetProductVo> {
    return this.productService.delete(id);
  }
}
