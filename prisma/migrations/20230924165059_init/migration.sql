/*
  Warnings:

  - You are about to drop the `PromoCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "promocode" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PromoCode";
PRAGMA foreign_keys=on;
