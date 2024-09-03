/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { Product } from 'src/entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'A route to create a product' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return this.productService.createProduct(createProductDto, req.user);
  }

  @Get('approved')
  @ApiOperation({ summary: 'A routes to get all approved products' })
  @ApiResponse({
    status: 200,
    description: 'All approved products retrieved successfully.',
    type: [Product],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getAllApproved(): Promise<Product[]> {
    return this.productService.findAllApproved();
  }

  @Get()
  @ApiOperation({ summary: 'A routes to get all products' })
  @ApiResponse({
    status: 200,
    description: 'All products retrieved successfully.',
    type: [Product],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get('product/:id')
  @ApiOperation({ summary: 'A routes to get a product' })
  @ApiResponse({
    status: 200,
    description: 'A product retrieved successfully.',
    type: Product,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getOneProduct(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'A routes to update a product' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully.',
    type: Product,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req,
  ) {
    return this.productService.updateProduct(id, updateProductDto, req.user.id);
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'A routes to delete a product' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    description: 'Json structure for product object',
    type: Product,
  })
  async deleteProduct(@Param('id') id: string, @Request() req) {
    return this.productService.deleteProduct(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'A routes to approved a product' })
  @Roles('Admin')
  @Patch('approve/:id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Product approved successfully.',
    type: Product,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async approveProduct(@Param('id') id: string) {
    return this.productService.approveProduct(id);
  }

  @Patch('disapprove/:id')
  @ApiOperation({ summary: 'A routes to Disapproved product' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiResponse({
    status: 200,
    description: 'Product disapproved successfully.',
    type: Product,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async disapproveProduct(@Param('id') id: string) {
    return this.productService.disapproveProduct(id);
  }
}
