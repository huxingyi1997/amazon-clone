import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
