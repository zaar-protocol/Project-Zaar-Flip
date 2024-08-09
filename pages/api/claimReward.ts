// pages/api/getWatchlist.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import initializeCors from 'nextjs-cors';

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
    const { id } = req.query;

    // Validate that id is provided and can be converted to a number
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    try {
    const challengeWin = await prisma.challengeWinner.findUnique({
        where: { id: numericId },
    });

    if (!challengeWin) {
        return res.status(404).json({ error: 'ChallengeWinner not found' });
    }

    // Calculate the time difference
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - new Date(challengeWin.createdAt).getTime();
    const hoursPassed = timeDifference / (1000 * 60 * 60);

    // Check if 24 hours have passed
    if (hoursPassed < 24) {
    return res.status(403).json({ error: 'Reward cannot be claimed yet. Please wait 24 hours.' });
    }

      const updatedChallengeWin = await prisma.challengeWinner.update({
        where: { id: numericId },
        data: { rewardClaimed: true },
      });

      res.status(200).json(updatedChallengeWin);
    } catch (error) {
      console.error('Error updating rewardClaimed:', error);
      res.status(500).json({ error: 'Failed to claim reward' });
    }
}
export default allowCors(handler);

