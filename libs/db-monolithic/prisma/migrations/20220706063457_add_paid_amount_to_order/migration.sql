-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paid_amount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "total_amount" SET DEFAULT 0;
