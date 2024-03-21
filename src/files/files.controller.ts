import { Controller, Delete, Get, Post, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateFileDto, CreateFilesDto } from './dto/create-file.dto';
import { fileStorage } from './storage';
import { UserId } from '../decorators/user-id.decorator';
import { AuthGuard } from '../auth/auth.guard';

interface FileModel extends Express.Multer.File {
  type: string;
  name: string;
}

@Controller('files')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('/upload')
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload files',
    type: CreateFilesDto,
  })
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @UserId() userId: number) {
    console.log(files, "asda")

    return this.filesService.create(files, userId);
  }

  @Post('/uploadOne')
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
    return this.filesService.createOne(file, userId)
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
