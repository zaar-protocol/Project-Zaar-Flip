// pages/api/getWatchlist.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { dailyChallenges } from '@/components/challengeComponents/dailyChallenges';
import { checkProgressFunctions } from '@/components/challengeComponents/checkProgressFunctions';
import { ChallengeKey } from '../../components/challengeComponents/checkProgressFunctions';
import { manualRandomness } from '@/lib/constants/manualRandomness';
import { publicClient } from '@/client';
import { zaarflipAddress } from '@/generated';
import { ManualFlipAbi } from '@/abis/ManualFlip-abi';
import { formatEther, parseEther } from 'viem';
// import { challengeKeys } from '../components/challengeComponents/checkProgressFunctions';
// import { getBalance } from 'wagmi/actions';
// import { initiaTokenAddress } from '../../generated';
// import { config } from '../../config';
// import { calculateRakebackPercentage } from '@/lib/calculateRakebackPercentage';

// type Event = { id: number; authorAddress: string; createdAt: Date; coins: number; wager: number; winnings: number; outcome: boolean; };

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

// function isValidEthereumAddress(address: string): boolean {
//   return /^0x[a-fA-F0-9]{40}$/.test(address);
// }

interface GameCreatedEvent {
  args: {
    player: `0x${string}`;
    gameId: string;
    betAmount: bigint;
    numberOfCoins: bigint;
    headsRequired: bigint;
    token: `0x${string}`;
    deadline: bigint;
  };
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //await initializeCors(req, res); // Initialize CORS
  try {
    const ownerAddress = req.query.ownerAddress?.toString() || "";
    const newWinnings = Number(req.query.winnings) || 0;
    const newWager = Number(req.query.wager) || 0;
    const newOutcome = Boolean(req.query.outcome === 'true') || false;
    const newSide = String(req.query.side) || "";
    const newGameId = String(req.query.gameId) || "";

    // Verify the game exists and matches the parameters
    // Get current block number and calculate a reasonable range (e.g., last ~1 day worth of blocks)
    // Assuming ~12 second block time, ~7200 blocks per day
    const currentBlock = await publicClient.getBlockNumber();
    const blocksPerDay = BigInt(7200);
    const fromBlock = currentBlock > blocksPerDay ? currentBlock - blocksPerDay : BigInt(0);
    
    const gameResult = await publicClient.getContractEvents({
      address: zaarflipAddress,
      abi: ManualFlipAbi,
      eventName: 'GameCreated',
      fromBlock: fromBlock,
      toBlock: 'latest'
    }) as unknown as GameCreatedEvent[];

    // Filter for our specific game ID
    const game = gameResult.find(g => g.args.gameId === newGameId);

    if (!game) {
      return res.status(400).json({ error: 'Invalid game ID' });
    }
    
    // Verify the parameters match what's on-chain
    if (
      game.args.player.toLowerCase() !== ownerAddress.toLowerCase() ||
      game.args.betAmount !== parseEther(newWager.toString())
    ) {
      return res.status(400).json({ error: 'Game parameters do not match' });
    }

    const fee = Math.floor(newWager * 0.01); // Assuming 1% fee

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
      
      // Validate and use the address
      
    // if (isValidEthereumAddress(ownerAddress)) {
    //   const balance = await getBalance(config, {
    //     address: ownerAddress as `0x${string}`, // Type assertion
    //     token: initiaTokenAddress,
    //   });
    //   startBalance = Number(formatEther(balance.value))
    // } else {
    //   throw new Error('Invalid Ethereum address format');
    // }

    }

    //create an event
  const newEvent = await prisma.event.create({
    data: {
      winnings: newWinnings,
      wager: newWager,
      outcome: newOutcome,
      authorAddress: ownerAddress,
      gameType: "Flip",
      fee: fee,
      gameId: newGameId,
      pending: manualRandomness, // If we are using manual randomness, we need to set pending to true. Provider will complete the game.
    },
  });

  await prisma.flipEvent.create({
    data: {
      coinSide: newSide,
      eventId: newEvent.id
    }
  })
    
    //try to find the user's profile
    //update or create it
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

    // Calculate rakeback
    // const rakebackPercentage = calculateRakebackPercentage(user.waged);
    // const rakebackAmount = fee * rakebackPercentage;

    // Upsert rakeback for the day
    // today.setHours(0, 0, 0, 0);

    // await prisma.rakeback.upsert({
    //   where: {
    //     authorAddress_date: {
    //       authorAddress: ownerAddress,
    //       date: today,
    //     },
    //   },
    //   update: {
    //     amount: { increment: rakebackAmount },
    //   },
    //   create: {
    //     authorAddress: ownerAddress,
    //     date: today,
    //     amount: rakebackAmount,
    //     claimed: false,
    //   },
    // });

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

