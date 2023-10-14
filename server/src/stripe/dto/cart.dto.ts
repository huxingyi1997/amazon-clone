import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ProductItem } from 'src/product/dto/product.dto';

export class CartItem extends ProductItem {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CheckoutCartDto {
  @IsArray()
  @Type(() => CartItem)
  @ValidateNested()
  @IsNotEmpty()
  cart: CartItem[];
}

export class CheckoutCartVo {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  object: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  amount_capturable: number;

  @IsNumber()
  @IsNotEmpty()
  amount_received: number;

  @IsString()
  @IsOptional()
  application?: string;

  @IsNumber()
  @IsOptional()
  application_fee_amount?: number;

  @IsString()
  @IsOptional()
  automatic_payment_methods?: string;

  @IsNumber()
  @IsOptional()
  canceled_at?: number;

  @IsString()
  @IsOptional()
  cancellation_reason?: string;

  @IsString()
  @IsNotEmpty()
  capture_method: string;

  @IsString()
  @IsNotEmpty()
  client_secret: string;

  @IsString()
  @IsNotEmpty()
  confirmation_method: string;

  @IsNumber()
  @IsNotEmpty()
  created: number;
}
