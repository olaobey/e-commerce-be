/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    description: 'Json structure for user object',
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() creatUserDto: CreateUserDto) {
    return this.userService.create(creatUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('ban/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async banUser(@Param('id') id: string) {
    return this.userService.banUser(id);
  }

  @Patch('unban/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async unbanUser(@Param('id') id: string) {
    return this.userService.unbanUser(id);
  }
}
