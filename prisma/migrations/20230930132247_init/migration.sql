/*
  Warnings:

  - You are about to drop the column `channels` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `idUser` on the `UserChanel` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" TEXT NOT NULL,
    "tariffPlan" TEXT NOT NULL DEFAULT 'base',
    "subscriptionEndDate" TEXT NOT NULL DEFAULT 'never',
    "createdOpt" INTEGER NOT NULL DEFAULT 0,
    "byOpt" INTEGER NOT NULL DEFAULT 0,
    "totalSavings" INTEGER NOT NULL DEFAULT 0,
    "invitedUsers" INTEGER NOT NULL DEFAULT 0,
    "totalEarned" INTEGER NOT NULL DEFAULT 0,
    "promocode" TEXT,
    "filter" TEXT DEFAULT 'none',
    "filter_opt" TEXT DEFAULT 'none',
    "message_mode" TEXT NOT NULL DEFAULT 'standart'
);
INSERT INTO "new_User" ("byOpt", "createdOpt", "filter", "filter_opt", "id", "idUser", "invitedUsers", "message_mode", "promocode", "subscriptionEndDate", "tariffPlan", "totalEarned", "totalSavings") SELECT "byOpt", "createdOpt", "filter", "filter_opt", "id", "idUser", "invitedUsers", "message_mode", "promocode", "subscriptionEndDate", "tariffPlan", "totalEarned", "totalSavings" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_UserChanel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idChanel" TEXT NOT NULL,
    "category" TEXT,
    "username" TEXT,
    "title" TEXT,
    "daily_reach" INTEGER,
    "ci_index" INTEGER,
    "participants_count" INTEGER,
    "avg_post_reach" INTEGER,
    "forwards_count" INTEGER,
    "idUser" INTEGER,
    CONSTRAINT "UserChanel_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserChanel" ("avg_post_reach", "category", "ci_index", "daily_reach", "forwards_count", "id", "idChanel", "idUser", "participants_count", "title", "username") SELECT "avg_post_reach", "category", "ci_index", "daily_reach", "forwards_count", "id", "idChanel", "idUser", "participants_count", "title", "username" FROM "UserChanel";
DROP TABLE "UserChanel";
ALTER TABLE "new_UserChanel" RENAME TO "UserChanel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
