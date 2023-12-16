/*
  Warnings:

  - The `buffer` column on the `File` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "buffer",
ADD COLUMN     "buffer" BYTEA[];
