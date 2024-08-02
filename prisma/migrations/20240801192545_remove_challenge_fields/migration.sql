-- CreateTable
CREATE TABLE "Xp" (
    "rewards" INTEGER NOT NULL,
    "authorAddress" TEXT NOT NULL,

    CONSTRAINT "Xp_pkey" PRIMARY KEY ("authorAddress")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "authorAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coins" INTEGER NOT NULL,
    "wager" INTEGER NOT NULL,
    "winnings" INTEGER NOT NULL,
    "outcome" BOOLEAN NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "bio" TEXT NOT NULL,
    "uName" TEXT NOT NULL,
    "authorAddress" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profPicUrl" TEXT NOT NULL,
    "bannerPicUrl" TEXT NOT NULL,
    "winnings" INTEGER NOT NULL,
    "waged" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("authorAddress")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_authorAddress_fkey" FOREIGN KEY ("authorAddress") REFERENCES "Profile"("authorAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
