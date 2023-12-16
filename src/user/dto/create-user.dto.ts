import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    default: "user"
  })
  readonly name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly email: string;

  @ApiProperty({
    type: String,
    required: true,
    default: "password"
  })
  readonly password: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    default: false
  })
  readonly isAdmin?: boolean;
}
