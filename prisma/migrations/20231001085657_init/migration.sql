/*
  Warnings:

  - The primary key for the `Opt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Opt` table. All the data in the column will be lost.
  - You are about to alter the column `chanel` on the `Opt` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Made the column `chanel` on table `Opt` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Opt" (
    "chanel" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT,
    "retail_price" TEXT,
    "wholesale_cost" TEXT,
    "min_places" TEXT,
    "max_places" TEXT,
    "booking_date" TEXT,
    "deadline_date" TEXT,
    "placement_time" TEXT,
    "requisites" TEXT,
    "status" TEXT NOT NULL DEFAULT 'created',
    "idUser" TEXT,
    CONSTRAINT "Opt_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Opt" ("booking_date", "category", "chanel", "deadline_date", "idUser", "max_places", "min_places", "placement_time", "requisites", "retail_price", "status", "wholesale_cost") SELECT "booking_date", "category", "chanel", "deadline_date", "idUser", "max_places", "min_places", "placement_time", "requisites", "retail_price", "status", "wholesale_cost" FROM "Opt";
DROP TABLE "Opt";
ALTER TABLE "new_Opt" RENAME TO "Opt";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
