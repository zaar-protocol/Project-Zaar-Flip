// pages/api/getWatchlist.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
import { formatEther } from 'viem';
import initializeCors from 'nextjs-cors';
import { getBalance } from 'wagmi/actions';
import { config } from '@/config';

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
    // Query your Prisma database based on the user's address
    const ownerAddress = req.query.ownerAddress?.toString() || ""; // Assuming the address is passed as a query parameter

    let startingBalance = 0;
    if (isValidEthereumAddress(ownerAddress)) {
      const balance = await getBalance(config, {
        address: ownerAddress as `0x${string}`, // Type assertion
      });
      startingBalance = Number(formatEther(balance.value))
    } else {
      throw new Error('Invalid Ethereum address format');
    }

    const user = await prisma.profile.upsert({
      where: { authorAddress: ownerAddress },
      update: {},
      create: {
        authorAddress: ownerAddress,
        winnings: 0,
        bio: "",
        uName: "",
        email: "",
        profPicUrl: "",
        bannerPicUrl: "",
        waged: 0,
        startingBalance: startingBalance || 0,
      },
      select: { winnings: true, waged: true, events: true, challengeWins: true, startingBalance: true }
    });

    const userData = await prisma.profile.findFirst({
        where: { authorAddress: ownerAddress },
        include: { events: true, challengeWins: true }, // Include the related events
        });
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export default allowCors(handler);

