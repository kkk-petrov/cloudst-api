import { ApiProperty } from "@nestjs/swagger";
import { File } from "@prisma/client";

export class CreateFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: File
}
