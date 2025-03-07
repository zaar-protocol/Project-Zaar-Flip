import { NextApiRequest, NextApiResponse } from 'next';
import { createWalletClient, getContract, http, parseEther } from 'viem';
import { mnemonicToAccount } from 'viem/accounts';
import { initia } from '@/config';
import { initiaTokenAbi, initiaTokenAddress } from '@/generated';
import { publicClient } from '@/client';
import { bech32 } from 'bech32';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const zaarTokenAddress = initiaTokenAddress;
const allowCors = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let address = req.query.address as string;
    //if address is bech32, convert to hex
    console.log("checking address: ", address);
    if (address?.match(/^init[a-zA-Z0-9]{38,39}$/)) {
      console.log("address is bech32");
      const { words: decodedWords } = bech32.decode(address);
      address = '0x' + Buffer.from(bech32.fromWords(decodedWords)).toString('hex');
      console.log(address);
    }
    
    if (!address?.match(/^0x[a-fA-F0-9]{40}$/) && !address?.match(/^init[a-zA-Z0-9]{38,39}$/)) {
      return res.status(400).json({ error: 'Invalid address format' });
    }

    // Check if user exists in the database and when they last used the faucet
    let profile = await prisma.profile.findUnique({
      where: { authorAddress: address }
    });

    // If user doesn't exist, create a profile
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          authorAddress: address,
          uName: '',
          bio: '',
          email: '',
          profPicUrl: '',
          bannerPicUrl: '',
          winnings: 0,
          waged: 0,
          startingBalance: 0
        }
      });
    } else if (profile.lastFaucetUse) {
      // Check if 24 hours have passed since last use
      const hoursElapsed = (Date.now() - profile.lastFaucetUse.getTime()) / (1000 * 60 * 60);
      if (hoursElapsed < 24) {
        return res.status(400).json({ 
          error: `Please wait ${Math.ceil(24 - hoursElapsed)} hours before claiming again.` 
        });
      }
    }

    const account = mnemonicToAccount(process.env.FAUCET_MNEMONIC as string);
    
    // Create wallet from mnemonic
    const walletClient = createWalletClient({
      account,
      chain: initia,
      transport: http()
    });
    
    let success = false;
    let retries = 0;
    const MAX_RETRIES = 5;
    let hash;

    while (!success && retries < MAX_RETRIES) {
      try {
        // Send tokens
        hash = await walletClient.writeContract({
          address: zaarTokenAddress,
          abi: initiaTokenAbi,
          functionName: 'transfer',
          args: [address as `0x${string}`, parseEther('100')],
        });
        
        success = true;
      } catch (error) {
        console.log(`Attempt ${retries + 1} failed:`, error);
        retries++;
        
        // Wait longer between each retry
        if (retries < MAX_RETRIES) {
          await new Promise(r => setTimeout(r, 1000 * retries));
        }
      }
    }

    if (success) {
      // Update the lastFaucetUse timestamp
      await prisma.profile.update({
        where: { authorAddress: address },
        data: { lastFaucetUse: new Date() }
      });
      
      res.status(200).json({ success: true, hash });
    } else {
      throw new Error(`Failed after ${MAX_RETRIES} attempts`);
    }
  } catch (error) {
    console.error('Faucet error:', error);
    res.status(500).json({ error: 'Failed to dispense funds' });
  } finally {
    await prisma.$disconnect();
  }
}

export default allowCors(handler); 


    // const currentBlock = await publicClient.getBlockNumber();
    
    // const fromBlock = currentBlock - BigInt(180) > BigInt(0) ? currentBlock - BigInt(180) : BigInt(0); // 24 * 60

    // const logs = await publicClient.getLogs({
    //   address: zaarTokenAddress,
    //   event: {
    //     type: 'event',
    //     name: 'Transfer',
    //     inputs: [
    //       { type: 'address', name: 'from', indexed: true },
    //       { type: 'address', name: 'to', indexed: true },
    //       { type: 'uint256', name: 'value', indexed: false }
    //     ]
    //   },
    //   args: {
    //     from: faucetAddress,
    //     to: address as `0x${string}`
    //   },
    //   fromBlock,
    //   toBlock: currentBlock
    // });

    // if (logs.length > 0) {
    //   console.log("logs: ", logs);
    //   return res.status(400).json({ error: 'Please wait a minute between claims.' });
    // }