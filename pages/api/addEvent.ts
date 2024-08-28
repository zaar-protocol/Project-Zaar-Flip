// pages/api/getWatchlist.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';
import initializeCors from 'nextjs-cors';
import { FaBullseye } from 'react-icons/fa6';
import { userAgent } from 'next/server';
import { dailyChallenges } from '@/components/challengeComponents/dailyChallenges';
import { checkProgressFunctions } from '@/components/challengeComponents/checkProgressFunctions';
import { challengeKeys } from '@/components/challengeComponents/checkProgressFunctions';
import { ChallengeKey } from '@/components/challengeComponents/checkProgressFunctions';
import { getBalance } from 'wagmi/actions';
import { config } from '@/config';
import { formatEther } from 'viem';

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

function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //await initializeCors(req, res); // Initialize CORS
  try {

    const ownerAddress = req.query.ownerAddress?.toString() || ""; 
    const newCoins = Number(req.query.coins) || 0; 
    const newWinnings = Number(req.query.winnings) || 0; 
    const newWager = Number(req.query.wager) || 0; 
    const newOutcome = Boolean(req.query.outcome === 'true') || false; 

    const today = new Date();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59, 999);

    const dayOfMonth = today.getDate();
    // const todaysChallenge = dailyChallenges[dayOfMonth % dailyChallenges.length];
    const todaysChallenge = dailyChallenges[2];

    const todaysEvents = await prisma.event.findMany({
      where: {
        authorAddress: ownerAddress,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    let startBalance = 0;
    if (todaysEvents.length === 0) {
      console.log("First event of the day")
      
      // Validate and use the address
      
    if (isValidEthereumAddress(ownerAddress)) {
      const balance = await getBalance(config, {
        address: ownerAddress as `0x${string}`, // Type assertion
      });
      startBalance = Number(formatEther(balance.value))
    } else {
      throw new Error('Invalid Ethereum address format');
    }
    console.log(startBalance)
    }

    //create an event
  const u = await prisma.event.create({
    data: {
      coins: newCoins,
      winnings: newWinnings,
      wager: newWager,
      outcome: newOutcome,
      authorAddress: ownerAddress,
    },
  });
    
    //try to find the user's profile
    //update or create it
    const user = await prisma.profile.upsert({
      where: { authorAddress: ownerAddress },
      update: {
        winnings: { increment: newWinnings },
        waged: { increment: newWager },
        ...(todaysEvents.length === 0 && { startingBalance: startBalance }),
      },
      create: {
        authorAddress: ownerAddress,
        winnings: newWinnings,
        bio: "",
        uName: "",
        email: "",
        profPicUrl: "",
        bannerPicUrl: "",
        waged: newWager,
        startingBalance: startBalance || 0,
      },
      select: { winnings: true, waged: true, events: true, challengeWins: true, startingBalance: true }
    });

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
    return res.status(200).json({
      eventCreated: true,
      challengeWon: false,
      message: 'Event added successfully. No challenge win because daily winner limit reached.',
    });
  }

  const todaysDate = new Date().toISOString().slice(0, 10);
  const hasWon = user.challengeWins.some(win => {
    const winDate = new Date(win.createdAt).toISOString().slice(0, 10);
    return win.challengeId === todaysChallenge.title && winDate === todaysDate;
  });

  if (hasWon) {
    return res.status(200).json({
      eventCreated: true,
      challengeWon: false,
      message: 'Event added successfully. No challenge win because you have already won today.',
    });
  }

  if (!Array.isArray(user.events)){
    return res.status(400).json({error: 'User events is not an array'});
  }

    const progress = checkProgressFunctions[todaysChallenge.title as ChallengeKey](user.events, Number(user.startingBalance));

    if (todaysChallenge.steps === progress) {

      await prisma.challengeWinner.create({
        data: {
          challengeId: todaysChallenge.title,
          authorAddress: ownerAddress,
          rewardClaimed: false,
        },
      });

      return res.status(200).json({
        eventCreated: true,
        challengeWon: true,
        message: 'Event added successfully. Challenge won!',
      });
    } else {
      return res.status(200).json({
        eventCreated: true,
        challengeWon: false,
        message: 'Event added successfully. Challenge progress incomplete.',
      });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export default allowCors(handler);

