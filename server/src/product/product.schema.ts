import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Document, ObjectId } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Prop()
  @IsString()
  @IsOptional()
  description?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
