import { randomUUID } from "node:crypto";
import type { CreateUserDto } from "@/user/dto/create-user.dto";
import type { LoginUserDto } from "@/user/dto/login-user.dto";
// biome-ignore lint/style/useImportType: used not as a type
import { UserService } from "@/user/user.service";
import {
	BadRequestException,
	Body,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
// biome-ignore lint/style/useImportType: used not as a type
import { JwtService } from "@nestjs/jwt";
import type { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

interface TokenPair {
	accessToken: string;
	refreshToken: string;
}

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService,
		private userService: UserService,
	) {}

	public async register(@Body() userData: CreateUserDto) {
		const passwordHash = await bcrypt.hash(userData.password, 10);
		const link = randomUUID();

		const user = await this.userService.create({
			email: userData.email,
			name: userData.name,
			password: passwordHash,
			activationLink: link,
			avatar: userData.avatar,
		});
		if (!user) {
			throw new BadRequestException();
		}

		const token = this.generateTokens(user);
		return { user, token };
	}

	public async login(@Body() userData: LoginUserDto) {
		const user = await this.userService.findUnique({ email: userData.email });
		if (!user) {
			throw new UnauthorizedException();
		}

		const isMatch = await bcrypt.compare(userData.password, user.password);
		if (!isMatch) {
			throw new UnauthorizedException();
		}

		const tokenPair = await this.generateTokens(user);
		console.log(tokenPair, user);

		return { user, tokenPair };
	}

	private async generateTokens(userData: User): Promise<TokenPair> {
		const accessToken = await this.jwt.signAsync(
			{ id: userData.id },
			{ expiresIn: "1h", secret: process.env.JWTKEY },
		);
		const refreshToken = await this.jwt.signAsync(
			{ id: userData.id },
			{ expiresIn: "30d", secret: process.env.JWTKEY },
		);

		return { accessToken, refreshToken };
	}

	public async refresh() {}
}
