import { Controller, Delete, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateFileDto } from './dto/create-file.dto';
import { fileStorage } from './storage';
import { UserId } from '../decorators/user-id.decorator';
import { AuthGuard } from '../auth/auth.guard';

@Controller('files')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) { }


  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file',
    type: CreateFileDto,
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File, @UserId() userId: number) {
    console.log(file)
    return this.filesService.create(file, userId)
  }

  @Get('')
  async findAll() {
    return this.filesService.findAll({ where: { deleted: false } })
  }

  @Delete('')
  async delete(@Query('ids') ids: string, @UserId() userId: number) {
    return await this.filesService.delete(ids, userId)
  }
}
