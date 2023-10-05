-- CreateTable
CREATE TABLE "RecommendationInto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "booking_date" TEXT,
    "status" TEXT NOT NULL DEFAULT 'created',
    "idUser" TEXT,
    "idRecommendation" INTEGER,
    CONSTRAINT "RecommendationInto_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "RecommendationInto_id_fkey" FOREIGN KEY ("id") REFERENCES "Recommendation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
