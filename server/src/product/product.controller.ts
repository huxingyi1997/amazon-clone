import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';
import {
  CreateProductDto,
  GetAllProductsVo,
  GetProductVo,
  UpdateProductDto,
} from './dto/product.dto';
import { ApiUnifiedCreatedResponse, ApiUnifiedOkResponse } from 'src/utils';

@ApiTags('product')
@ApiExtraModels(GetProductVo, GetAllProductsVo)
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiUnifiedCreatedResponse(GetProductVo)
  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<GetProductVo> {
    return this.productService.create(createProductDto);
  }

  @ApiUnifiedOkResponse(GetAllProductsVo)
  @Get()
  findAllProducts(): Promise<GetAllProductsVo> {
    return this.productService.findAll();
  }

  @ApiUnifiedOkResponse(GetProductVo)
  @Get(':id')
  findProduct(@Param('id') id: string): Promise<GetProductVo> {
    return this.productService.find(id);
  }

  @ApiUnifiedOkResponse(GetProductVo)
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<GetProductVo> {
    return this.productService.update(id, updateProductDto);
  }

  @ApiUnifiedOkResponse(GetProductVo)
  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<GetProductVo> {
    return this.productService.delete(id);
  }
}
