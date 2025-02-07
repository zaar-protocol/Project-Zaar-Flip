import { NextApiRequest, NextApiResponse } from 'next';
import { createWalletClient, getContract, http, parseEther } from 'viem';
import { mnemonicToAccount } from 'viem/accounts';
import { initia } from '@/config';
import { initiaTokenAddress, initiaTokenAbi } from '@/generated';
import { publicClient } from '@/client';

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
    const address = req.query.address as string;
    
    if (!address?.match(/^0x[a-fA-F0-9]{40}$/)) {
      return res.status(400).json({ error: 'Invalid address format' });
    }

    // Create account from mnemonic first to get the address
    const account = mnemonicToAccount(process.env.FAUCET_MNEMONIC as string);
    const faucetAddress = account.address;

    // Check recent transfers
    const contract = getContract({
      address: initiaTokenAddress,
      abi: initiaTokenAbi,
      client: publicClient,
    });

    const events = await contract.getEvents.Transfer({
      from: faucetAddress,
      to: address as `0x${string}`,
    });

    if (events.length > 0) {
      const latestEvent = events[events.length - 1];
      const block = await publicClient.getBlock({
        blockNumber: latestEvent.blockNumber,
      });
      const hoursSinceLastTransfer = (Date.now() / 1000 - Number(block.timestamp)) / 3600;

      if (hoursSinceLastTransfer < 24) {
        return res.status(400).json({ error: 'Please wait 24 hours between claims' });
      }
    }

    // Create wallet from mnemonic
    const walletClient = createWalletClient({
      account,
      chain: initia,
      transport: http()
    });

    // Send tokens
    const hash = await walletClient.writeContract({
      address: initiaTokenAddress,
      abi: initiaTokenAbi,
      functionName: 'transfer',
      args: [address as `0x${string}`, parseEther('100')]
    });

    res.status(200).json({ success: true, hash });
  } catch (error) {
    console.error('Faucet error:', error);
    res.status(500).json({ error: 'Failed to dispense funds' });
  }
}

export default allowCors(handler); 