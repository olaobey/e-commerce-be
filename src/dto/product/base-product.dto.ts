/* eslint-disable prettier/prettier */
import { IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseProduct {
  @ApiProperty({
    example: 'Nike',
    description: 'The name of the product',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'This is a best product',
    description: 'Best product',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '$120',
    description: 'The price of the product',
  })
  @IsOptional()
  @IsNumber()
  price?: number;
}
