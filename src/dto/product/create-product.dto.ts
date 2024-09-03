/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Nike', description: 'The name of the product' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'This is a best and quatity product',
    description: 'Best quality product ever',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '$100', description: 'The price of the product' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
