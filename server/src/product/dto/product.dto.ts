import { OmitType, PartialType } from '@nestjs/swagger';
import { Product } from '../product.schema';

export class CreateProductDto extends OmitType(Product, ['_id']) {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
