import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { PrismaService } from "./prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { FilesModule } from "./files/files.module";
import { MulterModule } from "@nestjs/platform-express";
import { fileStorage } from "./files/storage";

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
		AuthModule,
		MailModule,
		FilesModule,
		MulterModule.register({
			storage: fileStorage,
		}),
	],
	controllers: [UserController],
	providers: [UserService, PrismaService, JwtService],
})
export class AppModule {}
