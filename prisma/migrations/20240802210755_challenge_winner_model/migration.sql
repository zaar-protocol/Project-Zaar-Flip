-- CreateTable
CREATE TABLE "ChallengeWinner" (
    "id" SERIAL NOT NULL,
    "authorAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "challengeId" TEXT NOT NULL,

    CONSTRAINT "ChallengeWinner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChallengeWinner" ADD CONSTRAINT "ChallengeWinner_authorAddress_fkey" FOREIGN KEY ("authorAddress") REFERENCES "Profile"("authorAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
