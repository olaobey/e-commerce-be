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
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateUserDto } from '../dto/user/create-user.dto';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'A routes to get all the users by admin' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
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

  @Get('view/:id')
  @ApiOperation({ summary: 'A routes to get a user' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('ban/:id')
  @ApiOperation({ summary: 'A routes to Ban a user' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async banUser(@Param('id') id: string) {
    return this.userService.banUser(id);
  }

  @Patch('unban/:id')
  @ApiOperation({ summary: 'A routes to unban a user' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async unbanUser(@Param('id') id: string) {
    return this.userService.unbanUser(id);
  }
}
