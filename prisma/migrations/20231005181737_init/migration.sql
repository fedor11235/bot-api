-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recommendation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "price_standart" TEXT,
    "price_now" TEXT,
    "format" TEXT,
    "number_posts" INTEGER,
    "coverage" TEXT,
    "subscribers" TEXT,
    "data_list" TEXT,
    "requisites" TEXT,
    "deadline" TEXT,
    "info" TEXT
);
INSERT INTO "new_Recommendation" ("coverage", "data_list", "deadline", "format", "id", "info", "number_posts", "price_now", "price_standart", "requisites", "subscribers", "username") SELECT "coverage", "data_list", "deadline", "format", "id", "info", "number_posts", "price_now", "price_standart", "requisites", "subscribers", "username" FROM "Recommendation";
DROP TABLE "Recommendation";
ALTER TABLE "new_Recommendation" RENAME TO "Recommendation";
CREATE UNIQUE INDEX "Recommendation_username_key" ON "Recommendation"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
