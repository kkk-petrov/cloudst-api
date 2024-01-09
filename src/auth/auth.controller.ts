import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() data: CreateUserDto): Promise<User> {
    const { user } = await this.authService.register(data)
    return user
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginUserDto) {
    return this.authService.login(data)
  }
}
