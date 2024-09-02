/* eslint-disable prettier/prettier */
import { IsString, IsEmail, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    name: 'John Doe',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234578910',
    required: true,
  })
  @IsString()
  @MinLength(8)
  //regex for password to contain atleast one uppercase, lowercase, number and special character
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contain uppercase, lowercase, number and special character',
  })
  password: string;
}
