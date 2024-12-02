/*
  Warnings:

  - You are about to drop the column `trajectory` on the `PlinkoEvent` table. All the data in the column will be lost.
  - Added the required column `multiplier` to the `PlinkoEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlinkoEvent" DROP COLUMN "trajectory",
ADD COLUMN     "multiplier" DECIMAL(10,2) NOT NULL;
