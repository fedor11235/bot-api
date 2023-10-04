-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tariffPlan" TEXT NOT NULL DEFAULT 'base',
    "subscriptionEndDate" TEXT NOT NULL DEFAULT 'never',
    "createdOpt" INTEGER NOT NULL DEFAULT 0,
    "byOpt" INTEGER NOT NULL DEFAULT 0,
    "totalSavings" INTEGER NOT NULL DEFAULT 0,
    "invitedUsers" INTEGER NOT NULL DEFAULT 0,
    "totalEarned" INTEGER NOT NULL DEFAULT 0,
    "promocode" TEXT,
    "opt_chanel_create" TEXT,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "filter" TEXT DEFAULT 'none',
    "filter_opt" TEXT DEFAULT 'none',
    "message_mode" TEXT NOT NULL DEFAULT 'standart'
);
INSERT INTO "new_User" ("byOpt", "createdOpt", "filter", "filter_opt", "id", "invitedUsers", "message_mode", "opt_chanel_create", "promocode", "subscriptionEndDate", "tariffPlan", "totalEarned", "totalSavings") SELECT "byOpt", "createdOpt", "filter", "filter_opt", "id", "invitedUsers", "message_mode", "opt_chanel_create", "promocode", "subscriptionEndDate", "tariffPlan", "totalEarned", "totalSavings" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
