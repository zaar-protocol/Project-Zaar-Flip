-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "gameId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "pending" BOOLEAN NOT NULL DEFAULT false;
