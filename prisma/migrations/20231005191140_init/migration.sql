-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OptInto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "booking_date" TEXT NOT NULL DEFAULT '',
    "creatives" TEXT NOT NULL DEFAULT '',
    "allowed_dates" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'created',
    "idUser" TEXT,
    "chanel" TEXT,
    CONSTRAINT "OptInto_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OptInto_chanel_fkey" FOREIGN KEY ("chanel") REFERENCES "Opt" ("chanel") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_OptInto" ("allowed_dates", "booking_date", "chanel", "creatives", "id", "idUser", "status") SELECT "allowed_dates", "booking_date", "chanel", coalesce("creatives", '') AS "creatives", "id", "idUser", "status" FROM "OptInto";
DROP TABLE "OptInto";
ALTER TABLE "new_OptInto" RENAME TO "OptInto";
CREATE TABLE "new_RecommendationInto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chanel" TEXT,
    "creatives" TEXT NOT NULL DEFAULT '',
    "booking_date" TEXT NOT NULL DEFAULT '',
    "allowed_dates" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'created',
    "idUser" TEXT,
    "username_recommendation" TEXT,
    CONSTRAINT "RecommendationInto_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "RecommendationInto_username_recommendation_fkey" FOREIGN KEY ("username_recommendation") REFERENCES "Recommendation" ("username") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RecommendationInto" ("allowed_dates", "booking_date", "chanel", "creatives", "id", "idUser", "status", "username_recommendation") SELECT "allowed_dates", "booking_date", "chanel", coalesce("creatives", '') AS "creatives", "id", "idUser", "status", "username_recommendation" FROM "RecommendationInto";
DROP TABLE "RecommendationInto";
ALTER TABLE "new_RecommendationInto" RENAME TO "RecommendationInto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
