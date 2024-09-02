/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { LoginDto } from '../dto/user/login.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: LoginDto,
    description: 'Json structure for user object',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
