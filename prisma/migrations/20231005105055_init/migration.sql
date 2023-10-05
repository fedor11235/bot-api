-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT,
    "tariffPlan" TEXT NOT NULL DEFAULT 'base',
    "tariffPlan_temp" TEXT,
    "channel_temp" TEXT,
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

-- CreateTable
CREATE TABLE "OptInto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "booking_date" TEXT,
    "status" TEXT NOT NULL DEFAULT 'created',
    "idUser" TEXT,
    "chanel" TEXT,
    CONSTRAINT "OptInto_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OptInto_chanel_fkey" FOREIGN KEY ("chanel") REFERENCES "Opt" ("chanel") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Opt" (
    "chanel" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
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

-- CreateTable
CREATE TABLE "UserChanel" (
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
    "idUser" TEXT,
    CONSTRAINT "UserChanel_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Catalog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT,
    "username" TEXT,
    "title" TEXT,
    "link" TEXT,
    "daily_reach" INTEGER,
    "ci_index" INTEGER,
    "participants_count" INTEGER,
    "avg_post_reach" INTEGER,
    "forwards_count" INTEGER
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "price_standart" TEXT,
    "price_now" TEXT,
    "format" TEXT,
    "number_posts" INTEGER,
    "data_list" TEXT,
    "requisites" TEXT,
    "deadline" TEXT,
    "info" TEXT
);
