-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "milage" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Report_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("authorId", "createdAt", "id", "latitude", "longitude", "make", "milage", "model", "price", "updatedAt", "year") SELECT "authorId", "createdAt", "id", "latitude", "longitude", "make", "milage", "model", "price", "updatedAt", "year" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
