import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = await new this.productModel(createProductDto).save();

    return { product: newProduct };
  }

  async findAll() {
    const products = await this.productModel.find().exec();

    if (!products) {
      throw new NotFoundException(`Products data not found`);
    }

    return { products };
  }

  async find(id: string) {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return { product };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );

    if (!existingProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return { product: existingProduct };
  }

  async delete(id: string) {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return { product: deletedProduct };
  }
}
