import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@/auth/auth.guard";
// biome-ignore lint/style/useImportType: used not as a type
import { UserService } from "@/user/user.service";

@UseGuards(AuthGuard)
@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get("/test")
	async test() {
		return "Hello World";
	}

	@Get("")
	async getAll() {
		return this.userService.findAll({});
	}

	@Get("/:id")
	async getOneByID(@Param("id") id: string) {
		return await this.userService.findUnique({ id: Number.parseInt(id) });
	}

	@Delete("/:id")
	async deleteUser(@Param("id") id: string) {
		return await this.userService.delete({ id: Number.parseInt(id) });
	}
}
