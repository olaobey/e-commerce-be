/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class BaseUser {
  @ApiProperty()
  @IsString()
  id?: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  username?: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  confirmPassword?: string;
  @ApiProperty()
  @IsString()
  designation?: string;
}
