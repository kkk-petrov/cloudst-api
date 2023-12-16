import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { randomUUID } from 'crypto';
import { User } from '@prisma/client';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(private jwt: JwtService, private userService: UserService) { }

  public async register(@Body() userData: CreateUserDto) {
    const passwordHash = await bcrypt.hash(userData.password, 10)
    const link = randomUUID()

    const user = await this.userService.create({
      email: userData.email,
      name: userData.name,
      password: passwordHash,
      isAdmin: userData.isAdmin,
      activationLink: link
    })
    if (!user) {
      throw new BadRequestException
    }

    const token = this.generateToken(user)
    return { user, token }
  }

  public async login(@Body() userData: LoginUserDto): Promise<string> {
    const user = await this.userService.findUnique({ email: userData.email })
    if (!user) {
      throw new UnauthorizedException
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException
    }

    return this.generateToken(user)
  }

  private async generateToken(userData: User): Promise<string> {
    return this.jwt.signAsync({ id: userData.id, isAdmin: userData.isAdmin })
  }
}
