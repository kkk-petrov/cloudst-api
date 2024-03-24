import { AuthModule } from "@/auth/auth.module";
import { FilesModule } from "@/files/files.module";
import { fileStorage } from "@/files/storage";
import { PrismaService } from "@/prisma.service";
import { UserController } from "@/user/user.controller";
import { UserService } from "@/user/user.service";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
		AuthModule,
		FilesModule,
		MulterModule.register({
			storage: fileStorage,
		}),
	],
	controllers: [UserController],
	providers: [UserService, PrismaService, JwtService],
})
export class AppModule {}
