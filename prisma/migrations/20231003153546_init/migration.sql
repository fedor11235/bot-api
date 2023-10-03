/*
  Warnings:

  - You are about to alter the column `A` on the `_OptIntoToUser` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `OptInto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Opt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Opt` table. All the data in the column will be lost.
  - Added the required column `id` to the `OptInto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__OptIntoToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OptIntoToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "OptInto" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OptIntoToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__OptIntoToUser" ("A", "B") SELECT "A", "B" FROM "_OptIntoToUser";
DROP TABLE "_OptIntoToUser";
ALTER TABLE "new__OptIntoToUser" RENAME TO "_OptIntoToUser";
CREATE UNIQUE INDEX "_OptIntoToUser_AB_unique" ON "_OptIntoToUser"("A", "B");
CREATE INDEX "_OptIntoToUser_B_index" ON "_OptIntoToUser"("B");
CREATE TABLE "new_OptInto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chanel" TEXT NOT NULL,
    "booking_date" TEXT,
    "status" TEXT NOT NULL DEFAULT 'created'
);
INSERT INTO "new_OptInto" ("booking_date", "chanel", "status") SELECT "booking_date", "chanel", "status" FROM "OptInto";
DROP TABLE "OptInto";
ALTER TABLE "new_OptInto" RENAME TO "OptInto";
CREATE TABLE "new_Opt" (
    "chanel" TEXT NOT NULL PRIMARY KEY,
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
