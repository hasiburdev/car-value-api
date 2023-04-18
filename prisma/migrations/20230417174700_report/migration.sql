/*
  Warnings:

  - Added the required column `latitude` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `make` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `milage` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "milage" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Report_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("authorId", "createdAt", "id", "price", "updatedAt") SELECT "authorId", "createdAt", "id", "price", "updatedAt" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
