import { Injectable, type OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	async softDelete(ids: string, userId: number) {
		console.log(ids.split(","));
		const idsArray = ids.split(",").map((id) => Number.parseInt(id));

		return this.file.updateMany({
			where: { id: { in: idsArray }, ownerId: userId },
			data: { deleted: true },
		});
	}
}
