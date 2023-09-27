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
