import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "process";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import path from "path";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bodyParser: false,
	});
	app.enableCors();

	const config = new DocumentBuilder()
		.setTitle("Cloud")
		.setDescription("Cloud storage API")
		.setVersion("1.0")
		.addTag("cloud")
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	console.log(path.resolve(__dirname, "/src/uploads"));
	await app.listen(env.PORT);
}
bootstrap();
