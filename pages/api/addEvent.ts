// pages/api/getWatchlist.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';
import initializeCors from 'nextjs-cors';
import { FaBullseye } from 'react-icons/fa6';
import { userAgent } from 'next/server';
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
    const ownerAddress = req.query.ownerAddress?.toString() || ""; // Assuming the address is passed as a query parameter
    const newCoins = Number(req.query.coins) || 0; // Assuming the address is passed as a query parameter
    const newWinnings = Number(req.query.winnings) || 0; // Assuming the address is passed as a query parameter
    const newWager = Number(req.query.wager) || 0; // Assuming the address is passed as a query parameter
    const newOutcome = Boolean(req.query.outcome === 'true') || false; // Assuming the address is passed as a query parameter
    
    //try to find the user's profile
    //update or create it
    const user = await prisma.profile.findUnique({
      where: { authorAddress: ownerAddress },
      select: {winnings: true, waged:true,},
    });
  
    const newUser = await prisma.profile.upsert({
        where: { authorAddress: ownerAddress },
        update: {
          winnings: (user?.winnings || 0) + newWinnings,
          waged: (user?.waged || 0) + newWager,
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
        },
      });

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
    res.status(200).json(u);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export default allowCors(handler);

