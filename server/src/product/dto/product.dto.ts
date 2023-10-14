import { OmitType, PartialType } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Product } from '../product.schema';

export class CreateProductDto extends OmitType(Product, ['_id']) {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ProductItem extends OmitType(Product, ['_id']) {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsNumber()
  @IsOptional()
  __v?: number;
}

export class GetProductVo {
  @Type(() => ProductItem)
  @ValidateNested()
  @IsOptional()
  product?: ProductItem;
}

export class GetAllProductsVo {
  @IsArray()
  @Type(() => ProductItem)
  @ValidateNested()
  @IsOptional()
  products?: ProductItem[];
}
