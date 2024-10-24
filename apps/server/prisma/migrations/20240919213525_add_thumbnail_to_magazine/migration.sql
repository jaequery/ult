/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Magazine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Magazine" DROP COLUMN "fileUrl",
ADD COLUMN     "pdfFileUrl" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT;
