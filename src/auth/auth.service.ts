/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { LoginDto } from '../dto/user/login.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async register(payload: CreateUserDto): Promise<User> {
    return this.userService.create(payload);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    // Validate the user credentials
    const user = await this.validateUser(email, password);

    // Create JWT payload
    const payload = { email: user.email, sub: user.id, role: user.role };

    // Generate JWT token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
