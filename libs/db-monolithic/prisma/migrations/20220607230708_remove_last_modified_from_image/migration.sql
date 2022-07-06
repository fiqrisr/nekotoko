/*
  Warnings:

  - You are about to drop the column `lastModified` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `lastModifiedDate` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "lastModified",
DROP COLUMN "lastModifiedDate";
