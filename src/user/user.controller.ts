import { Controller, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/test')
  async test() {
    return "Hello World";
  }

  @Get('')
  async getAll() {
    return this.userService.findAll({});
  }

  @Get('/:id')
  async getOneByID(@Param('id') id: string) {
    return await this.userService.findUnique({ id: parseInt(id) })
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete({ id: parseInt(id) })
  }
}
