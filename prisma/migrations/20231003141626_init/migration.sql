-- CreateTable
CREATE TABLE "OptInto" (
    "chanel" TEXT NOT NULL PRIMARY KEY,
    "booking_date" TEXT
);

-- CreateTable
CREATE TABLE "_OptIntoToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OptIntoToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "OptInto" ("chanel") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OptIntoToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptIntoToUser_AB_unique" ON "_OptIntoToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_OptIntoToUser_B_index" ON "_OptIntoToUser"("B");
