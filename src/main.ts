import { env } from "node:process";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.use(cookieParser());

	const config = new DocumentBuilder()
		.setTitle("Cloud")
		.setDescription("Cloud storage API")
		.setVersion("1.0")
		.addTag("cloud")
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(env.PORT);
}

bootstrap();
