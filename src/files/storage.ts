import path from "node:path";
import { diskStorage } from "multer";

const generateId = () =>
	Array(18)
		.fill(null)
		.map(() => Math.round(Math.random() * 16).toString(16))
		.join("");

const normalizeFileName = (_req, file, callback) => {
	const fileExtName = file.originalname.split(".").pop();

	callback(null, `${generateId()}.${fileExtName}`);
};

export const fileStorage = diskStorage({
	destination: path.resolve("storage"),
	filename: normalizeFileName,
});
