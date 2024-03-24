import { FilesController } from "@/files/files.controller";
import { FilesService } from "@/files/files.service";
import { PrismaService } from "@/prisma.service";
import { Module } from "@nestjs/common";

@Module({
	controllers: [FilesController],
	providers: [FilesService, PrismaService],
	imports: [],
})
export class FilesModule {}
