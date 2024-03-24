import { AuthGuard } from "@/auth/auth.guard";
import { UserModule } from "@/user/user.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "./auth.service";

@Module({
	controllers: [AuthController],
	providers: [AuthService, AuthGuard],
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWTKEY,
			signOptions: { expiresIn: "14d" },
		}),
	],
	exports: [AuthService, AuthGuard],
})
export class AuthModule {}
