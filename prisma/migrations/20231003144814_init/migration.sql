/*
  Warnings:

  - The primary key for the `OptInto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OptInto` table. All the data in the column will be lost.
  - Added the required column `chanel` to the `OptInto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__OptIntoToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OptIntoToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "OptInto" ("chanel") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OptIntoToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__OptIntoToUser" ("A", "B") SELECT "A", "B" FROM "_OptIntoToUser";
DROP TABLE "_OptIntoToUser";
ALTER TABLE "new__OptIntoToUser" RENAME TO "_OptIntoToUser";
CREATE UNIQUE INDEX "_OptIntoToUser_AB_unique" ON "_OptIntoToUser"("A", "B");
CREATE INDEX "_OptIntoToUser_B_index" ON "_OptIntoToUser"("B");
CREATE TABLE "new_OptInto" (
    "chanel" TEXT NOT NULL PRIMARY KEY,
    "booking_date" TEXT
);
INSERT INTO "new_OptInto" ("booking_date") SELECT "booking_date" FROM "OptInto";
DROP TABLE "OptInto";
ALTER TABLE "new_OptInto" RENAME TO "OptInto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
