/*
  Warnings:

  - You are about to drop the column `state` on the `Opt` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Opt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "retail_price" TEXT,
    "wholesale_cost" TEXT,
    "min_places" TEXT,
    "max_places" TEXT,
    "booking_date" TEXT,
    "deadline_date" TEXT,
    "placement_time" TEXT,
    "requisites" TEXT,
    "status" TEXT NOT NULL DEFAULT 'created',
    "idUser" INTEGER,
    CONSTRAINT "Opt_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Opt" ("id", "idUser") SELECT "id", "idUser" FROM "Opt";
DROP TABLE "Opt";
ALTER TABLE "new_Opt" RENAME TO "Opt";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
