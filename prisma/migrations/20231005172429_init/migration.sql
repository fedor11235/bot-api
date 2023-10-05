-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OptInto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "booking_date" TEXT NOT NULL DEFAULT '',
    "allowed_dates" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'created',
    "idUser" TEXT,
    "chanel" TEXT,
    CONSTRAINT "OptInto_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OptInto_chanel_fkey" FOREIGN KEY ("chanel") REFERENCES "Opt" ("chanel") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_OptInto" ("allowed_dates", "booking_date", "chanel", "id", "idUser", "status") SELECT coalesce("allowed_dates", '') AS "allowed_dates", coalesce("booking_date", '') AS "booking_date", "chanel", "id", "idUser", "status" FROM "OptInto";
DROP TABLE "OptInto";
ALTER TABLE "new_OptInto" RENAME TO "OptInto";
CREATE TABLE "new_Opt" (
    "chanel" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "category" TEXT,
    "retail_price" TEXT,
    "wholesale_cost" TEXT,
    "min_places" TEXT,
    "max_places" TEXT,
    "booking_date" TEXT NOT NULL DEFAULT '',
    "deadline_date" TEXT,
    "placement_time" TEXT,
    "requisites" TEXT,
    "status" TEXT NOT NULL DEFAULT 'created',
    "idUser" TEXT,
    CONSTRAINT "Opt_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Opt" ("booking_date", "category", "chanel", "deadline_date", "idUser", "max_places", "min_places", "placement_time", "requisites", "retail_price", "status", "title", "wholesale_cost") SELECT coalesce("booking_date", '') AS "booking_date", "category", "chanel", "deadline_date", "idUser", "max_places", "min_places", "placement_time", "requisites", "retail_price", "status", "title", "wholesale_cost" FROM "Opt";
DROP TABLE "Opt";
ALTER TABLE "new_Opt" RENAME TO "Opt";
CREATE TABLE "new_RecommendationInto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chanel" TEXT,
    "booking_date" TEXT NOT NULL DEFAULT '',
    "allowed_dates" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'created',
    "idUser" TEXT,
    "username_recommendation" TEXT,
    CONSTRAINT "RecommendationInto_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "RecommendationInto_username_recommendation_fkey" FOREIGN KEY ("username_recommendation") REFERENCES "Recommendation" ("username") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RecommendationInto" ("allowed_dates", "booking_date", "chanel", "id", "idUser", "status", "username_recommendation") SELECT coalesce("allowed_dates", '') AS "allowed_dates", coalesce("booking_date", '') AS "booking_date", "chanel", "id", "idUser", "status", "username_recommendation" FROM "RecommendationInto";
DROP TABLE "RecommendationInto";
ALTER TABLE "new_RecommendationInto" RENAME TO "RecommendationInto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
