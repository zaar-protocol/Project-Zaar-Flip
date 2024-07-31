// pages/api/getWatchlist.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
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
  //await initializeCors(req, res); // Initialize CORS
  

  try {
    // Query your Prisma database based on the user's address
    const ownerAddress = req.query.ownerAddress?.toString() || ""; // Assuming the address is passed as a query parameter
    const userName = ""; // Assuming the address is passed as a query parameter
    const newBio =  ""; // Assuming the address is passed as a query parameter
    const newEmail = ""; // Assuming the address is passed as a query parameter
    const newProfPicURL = ""; // Assuming the address is passed as a query parameter
    const newBannerPicURL = ""; // Assuming the address is passed as a query parameters
    const newChallengeId = Number(req.query.challengeId) || 0; // Assuming the address is passed as a query parameter
    const newChallengeProgress = Number(req.query.challengeProgress) || -1; // Assuming the address is passed as a query parameter  
    const userData = await prisma.profile.upsert({
        where: { authorAddress: ownerAddress },
        update: {challengeId: newChallengeId, challengeProgress: newChallengeProgress},
        create: {uName: userName, bio: newBio, authorAddress: ownerAddress, email: newEmail, profPicUrl: newProfPicURL, bannerPicUrl: newBannerPicURL, winnings:0, waged:0, challengeId:newChallengeId, challengeProgress:0} ,
    });
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export default allowCors(handler);

