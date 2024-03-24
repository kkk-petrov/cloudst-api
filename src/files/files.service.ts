import { randomUUID } from "node:crypto";
// biome-ignore lint/style/useImportType: used not as a type
import { PrismaService } from "@/prisma.service";
import { Injectable } from "@nestjs/common";
import type { File, Prisma } from "@prisma/client";

@Injectable()
export class FilesService {
	constructor(private readonly prisma: PrismaService) {}

	async create(files: Array<Express.Multer.File>, userId: number) {
		console.log(files);
		const createdFiles = [];

		for (const file of files) {
			const createdFile = await this.createOne(file, userId);
			createdFiles.push(createdFile);
		}

		return createdFiles;
	}

	async createOne(file: Express.Multer.File, userId: number) {
		return this.prisma.file.create({
			data: {
				type: file.mimetype,
				originalName: file.originalname,
				size: file.size,
				name: randomUUID(),
				ownerId: userId,
			},
		});
	}

	async findUnique(
		fileWhereUniqueInput: Prisma.FileWhereUniqueInput,
	): Promise<File | null> {
		return await this.prisma.file.findUnique({
			where: fileWhereUniqueInput,
		});
	}

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
		return this.prisma.softDelete(ids, userId);
	}
}
