// pages/api/getWatchlist.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';
import initializeCors from 'nextjs-cors';
import { FaBullseye } from 'react-icons/fa6';
import { userAgent } from 'next/server';
import {checkProgressFunctions} from '../../components/checkProgressFunctions';
import { ChallengeKey } from '../../components/checkProgressFunctions';
import { challengeKeys } from '../../components/checkProgressFunctions';
type Event = { id: number; authorAddress: string; createdAt: Date; coins: number; wager: number; winnings: number; outcome: boolean; };
const allowCors = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //await initializeCors(req, res); // Initialize CORS
  try {
    // Query your Prisma database based on the user's address
    const ownerAddress = req.query.ownerAddress?.toString() || ""; 
    const newChallengeId = req.query.challengeId?.toString() || "";
    const steps = Number(req.query.steps) || 0;


    const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const winnersCount = await prisma.challengeWinner.count({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  if (winnersCount >= 3) {
    return res.status(400).json({error: 'There are already 3 winners for today'});
  }

  const user = await prisma.profile.findUnique({
    where: { authorAddress: ownerAddress },
    select: {challengeWins: true},
  });

  if (!user) {
    return res.status(404).json({error: 'Profile not found.'});
  }

  const hasWon = user.challengeWins.some(win => (win.challengeId === newChallengeId));
  if (hasWon) {
    return res.status(400).json({error: 'This profile has already won this challenge.'});
  }

  const userData = await prisma.event.findMany({
    where: { authorAddress: ownerAddress },
  });

  if (!Array.isArray(userData)){
    return res.status(400).json({error: 'User events is not an array'});
  }

  if(challengeKeys.includes(newChallengeId as ChallengeKey)){
    const progress = checkProgressFunctions[newChallengeId as ChallengeKey](userData);
    if (steps === progress) {
      
      // Reward contract logic goes here

      const u = await prisma.challengeWinner.create({
        data: {
          challengeId: newChallengeId,
          authorAddress: ownerAddress,
        },
      });
      res.status(200).json(u);
    } else {
      res.status(400).json({error: "Challenge progress incomplete."})
    }
  } else {
    res.status(400).json({error: "Invalid challengeId."})
  }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export default allowCors(handler);

