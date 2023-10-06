/*
  Warnings:

  - You are about to drop the column `avg_post_reach` on the `Catalog` table. All the data in the column will be lost.
  - You are about to drop the column `ci_index` on the `Catalog` table. All the data in the column will be lost.
  - You are about to drop the column `daily_reach` on the `Catalog` table. All the data in the column will be lost.
  - You are about to drop the column `forwards_count` on the `Catalog` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Catalog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT,
    "username" TEXT,
    "title" TEXT,
    "link" TEXT,
    "participants_count" TEXT,
    "coverage" TEXT,
    "advertising_price" TEXT,
    "recommendations" TEXT,
    "communication" TEXT
);
INSERT INTO "new_Catalog" ("category", "id", "link", "participants_count", "title", "username") SELECT "category", "id", "link", "participants_count", "title", "username" FROM "Catalog";
DROP TABLE "Catalog";
ALTER TABLE "new_Catalog" RENAME TO "Catalog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
