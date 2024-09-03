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
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateProductDto,
    description: 'Json structure for product object',
  })
  async create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return this.productService.createProduct(createProductDto, req.user.id);
  }

  @Get('approved')
  @ApiResponse({
    status: 200,
    description: 'All products retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    description: 'Json structure for product object',
  })
  async getAllApproved() {
    return this.productService.findAllApproved();
  }

  @Get('product/:id')
  @ApiResponse({
    status: 200,
    description: 'A product retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    description: 'Json structure for product object',
  })
  async getOneProduct(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    description: 'Json structure for product object',
  })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req,
  ) {
    return this.productService.updateProduct(id, updateProductDto, req.user.id);
  }

  @Delete('remove/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    description: 'Json structure for product object',
  })
  async deleteProduct(@Param('id') id: string, @Request() req) {
    return this.productService.deleteProduct(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('approve/:id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Product approved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    description: 'Json structure for product object',
  })
  async approveProduct(@Param('id') id: string) {
    return this.productService.approveProduct(id);
  }
}
