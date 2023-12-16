import { Injectable } from '@nestjs/common';
import { File, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) { }

  async create(data: Express.Multer.File, userId: number): Promise<File> {
    return this.prisma.file.create({
      data: {
        type: data.mimetype,
        originalName: data.originalname,
        size: data.size,
        name: randomUUID(),
        ownerId: userId,
      }
    });
  }


  // TODO: ...
  async findUnique(
    fileWhereUniqueInput: Prisma.FileWhereUniqueInput,
  ): Promise<File | null> {
    return await this.prisma.file.findUnique({
      where: fileWhereUniqueInput,
    });
  }

  // TODO: ...
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FileWhereUniqueInput;
    where?: Prisma.FileWhereInput;
    orderBy?: Prisma.FileOrderByWithRelationInput;
  }): Promise<File[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.file.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  delete(ids: string, userId: number) {
    return this.prisma.softDelete(ids, userId)
  }
}
