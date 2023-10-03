-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OptInto" (
    "chanel" TEXT NOT NULL PRIMARY KEY,
    "booking_date" TEXT,
    "status" TEXT NOT NULL DEFAULT 'created'
);
INSERT INTO "new_OptInto" ("booking_date", "chanel") SELECT "booking_date", "chanel" FROM "OptInto";
DROP TABLE "OptInto";
ALTER TABLE "new_OptInto" RENAME TO "OptInto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
