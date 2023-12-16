import { Body, Controller, Post } from '@nestjs/common';
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
  async login(@Body() data: LoginUserDto): Promise<string> {
    return this.authService.login(data)
  }
}
