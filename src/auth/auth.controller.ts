// biome-ignore lint/style/useImportType: used not as a type
import { AuthService } from "@/auth/auth.service";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { LoginUserDto } from "@/user/dto/login-user.dto";
import { Body, Controller, Get, HttpCode, Post, Res } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import type { User } from "@prisma/client";
import type { Response } from "express";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("register")
	@HttpCode(201)
	@ApiBody({
		description: "Register",
		type: CreateUserDto,
	})
	async register(@Body() data: CreateUserDto): Promise<User> {
		console.log(data);

		const { user } = await this.authService.register(data);
		return user;
	}

	@Post("login")
	@HttpCode(200)
	@ApiBody({
		description: "Login",
		type: LoginUserDto,
	})
	async login(
		@Body() data: LoginUserDto,
		@Res({ passthrough: true }) res: Response,
	) {
		console.log(data);
		const { tokenPair, user } = await this.authService.login(data);

		res.cookie("refreshToken", tokenPair.refreshToken, { httpOnly: true });
		return { token: tokenPair.accessToken, user };
	}

	@Get("refresh")
	@HttpCode(200)
	async refresh() {
		return this.authService.refresh();
	}
}
