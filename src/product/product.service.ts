/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { User } from '../entities/user.entity';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const product = this.productRepository.create({
      ...createProductDto,
      user,
    });
    return this.productRepository.save(product);
  }

  async findAllApproved(): Promise<Product[]> {
    return this.productRepository.find({ where: { isApproved: true } });
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    user: User,
  ): Promise<Product> {
    const product = await this.findById(id);
    if (product.user.id !== user.id && user.role !== UserRole.Admin) {
      throw new ForbiddenException(
        'You do not have permission to update this product',
      );
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async deleteProduct(id: string, user: User): Promise<void> {
    const product = await this.findById(id);
    if (product.user.id !== user.id && user.role !== UserRole.Admin) {
      throw new ForbiddenException(
        'You do not have permission to delete this product',
      );
    }
    await this.productRepository.remove(product);
  }

  async approveProduct(id: string): Promise<Product> {
    const product = await this.findById(id);
    product.isApproved = true;
    return this.productRepository.save(product);
  }

  async disapproveProduct(id: string): Promise<Product> {
    const product = await this.findById(id);
    product.isApproved = false;
    return this.productRepository.save(product);
  }
}
