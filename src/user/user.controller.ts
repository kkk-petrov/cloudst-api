import { Controller, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

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
