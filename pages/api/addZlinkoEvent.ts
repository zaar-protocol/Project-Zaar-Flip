import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { dailyChallenges } from '@/components/challengeComponents/dailyChallenges';
import { checkProgressFunctions } from '@/components/challengeComponents/checkProgressFunctions';
import { ChallengeKey } from '../../components/challengeComponents/checkProgressFunctions';

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
  try {
    const ownerAddress = req.query.ownerAddress?.toString() || "";
    const newWinnings = Number(req.query.winnings) || 0;
    const newWager = Number(req.query.wager) || 0;
    const newOutcome = Boolean(req.query.outcome === 'true') || false;
    const risk = String(req.query.risk) || "";
    const multiplier = Number(req.query.multiplier) || 1.00;
    const fee = Math.floor(newWager * 0.01);

    const today = new Date();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59, 999);

    const dayOfMonth = today.getDate();
    const todaysChallenge = dailyChallenges[dayOfMonth % dailyChallenges.length];

    const todaysEvents = await prisma.event.findMany({
      where: {
        authorAddress: ownerAddress,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    const startBalance = 0;
    if (todaysEvents.length === 0) {
      console.log("First event of the day")
    }

    // Create event
    const newEvent = await prisma.event.create({
      data: {
        winnings: newWinnings,
        wager: newWager,
        outcome: newOutcome,
        authorAddress: ownerAddress,
        gameType: "Plinko",
        fee: fee,
      },
    });

    // Create plinko event
    await prisma.plinkoEvent.create({
      data: {
        risk: risk,
        multiplier: multiplier,
        eventId: newEvent.id
      }
    });
    
    const user = await prisma.profile.upsert({
      where: { authorAddress: ownerAddress },
      update: {
        winnings: { increment: newWinnings },
        waged: { increment: newWager },
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