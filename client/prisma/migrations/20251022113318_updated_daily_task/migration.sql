/*
  Warnings:

  - Added the required column `CurrentMonth` to the `DailyTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CurrentYear` to the `DailyTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyTask" ADD COLUMN     "CurrentMonth" INTEGER NOT NULL,
ADD COLUMN     "CurrentYear" INTEGER NOT NULL;
