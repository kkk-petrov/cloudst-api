import { AuthGuard } from "@/auth/auth.guard";
import { UserId } from "@/decorators/user-id.decorator";
import { CreateFileDto, CreateFilesDto } from "@/files/dto/create-file.dto";
// biome-ignore lint/style/useImportType: used not as a type
import { FilesService } from "@/files/files.service";
import { fileStorage } from "@/files/storage";
import {
	Controller,
	Delete,
	Get,
	Post,
	Query,
	UploadedFile,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";

@Controller("files")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post("/upload")
	@UseInterceptors(
		FilesInterceptor("file", 10, {
			storage: fileStorage,
		}),
	)
	@ApiConsumes("multipart/form-data")
	@ApiBody({
		description: "Upload files",
		type: CreateFilesDto,
	})
	async uploadFiles(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@UserId() userId: number,
	) {
		console.log(files);

		return this.filesService.create(files, userId);
	}

	@Post("/uploadOne")
	@UseInterceptors(
		FileInterceptor("file", {
			storage: fileStorage,
		}),
	)
	@ApiConsumes("multipart/form-data")
	@ApiBody({
		description: "Upload file",
		type: CreateFileDto,
	})
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@UserId() userId: number,
	) {
		return this.filesService.createOne(file, userId);
	}

	@Get("/all")
	async findAll() {
		return this.filesService.findAll({ where: { deleted: false } });
	}

	@Get("/unique/:id")
	async findUnique(@Query("id") id: string) {
		return this.filesService.findUnique({ id: Number.parseInt(id) });
	}

	@Get("")
	async findAllOwnedByUser(@UserId() userId: number) {
		return this.filesService.findAll({
			where: { ownerId: userId, deleted: false },
		});
	}

	@Get("/:id")
	async findUniqueOwnedByUser(@Query("id") id: string) {
		return this.filesService.findUnique({ id: Number.parseInt(id) });
	}

	@Delete("")
	async delete(@Query("ids") ids: string, @UserId() userId: number) {
		return await this.filesService.delete(ids, userId);
	}
}
