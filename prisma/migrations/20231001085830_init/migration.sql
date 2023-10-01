/*
  Warnings:

  - The primary key for the `Opt` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
