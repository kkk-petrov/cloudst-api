import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { User, Prisma } from "@prisma/client";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async findUnique(
		userWhereUniqueInput: Prisma.UserWhereUniqueInput,
	): Promise<User | null> {
		return await this.prisma.user.findUnique({
			where: userWhereUniqueInput,
		});
	}

	async findAll(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.UserWhereUniqueInput;
		where?: Prisma.UserWhereInput;
		orderBy?: Prisma.UserOrderByWithRelationInput;
	}) {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.user.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			select: {
				id: true,
				email: true,
				name: true,
				files: true,
				avatar: true,
				deleted: true,
				folders: true,
				createdAt: true,
				updatedAt: true,
				isActivated: true,
				activationLink: true,
				password: false,
			},
		});
	}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({
			data,
		});
	}

	async update(params: {
		where: Prisma.UserWhereUniqueInput;
		data: Prisma.UserUpdateInput;
	}): Promise<User> {
		const { where, data } = params;
		return this.prisma.user.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
		return this.prisma.user.delete({
			where,
		});
	}
}
