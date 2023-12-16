-- AlterTable
ALTER TABLE "File" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "originalName" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
