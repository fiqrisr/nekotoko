/*
  Warnings:

  - Added the required column `unit` to the `ProductComposition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductComposition" ADD COLUMN     "unit" VARCHAR(255) NOT NULL;
