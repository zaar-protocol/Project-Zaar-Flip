/*
  Warnings:

  - You are about to drop the column `coins` on the `Event` table. All the data in the column will be lost.
  - Added the required column `rewardClaimed` to the `ChallengeWinner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startingBalance` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChallengeWinner" ADD COLUMN     "rewardClaimed" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "coins",
ADD COLUMN     "fee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gameType" TEXT NOT NULL DEFAULT 'Flip';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "startingBalance" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "FlipEvent" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "coinSide" TEXT NOT NULL,

    CONSTRAINT "FlipEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlinkoEvent" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "risk" TEXT NOT NULL,
    "trajectory" TEXT NOT NULL,

    CONSTRAINT "PlinkoEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FlipEvent_eventId_key" ON "FlipEvent"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "PlinkoEvent_eventId_key" ON "PlinkoEvent"("eventId");

-- AddForeignKey
ALTER TABLE "FlipEvent" ADD CONSTRAINT "FlipEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlinkoEvent" ADD CONSTRAINT "PlinkoEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
