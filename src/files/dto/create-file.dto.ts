import { ApiProperty } from "@nestjs/swagger";
import { File } from "@prisma/client";

export class CreateFilesDto {
	@ApiProperty({ type: "array", items: { type: "string", format: "binary" } })
	file: File[];
}

export class CreateFileDto {
	@ApiProperty({ type: "string", format: "binary" })
	file: File;
}
